let TAG = " EXE "
const { exec } = require('child_process');
require('dotenv').config()
console.log("USING USE_GPT_4")
const util = require('util');
const { Configuration, OpenAIApi } = require("openai");
const short = require('short-uuid');
const log = require('@pioneer-platform/loggerdog')()
let ai = require('@pioneer-platform/pioneer-intelligence')
const os = require('os');
let connection  = require("@pioneer-platform/default-mongo")
let wait = require('wait-promise');
let sleep = wait.sleep;
let fs = require('fs')
const skillsDB = connection.get('skills')
const tasksDB = connection.get('tasks')
// command to execute
const cmd = 'ls';
const path = require('path');
const mkdirp = require('mkdirp');

interface Data {
    query: string
    queueId:string
    admin:boolean
    dm:boolean
    user:string
    username:string
    channel:string
    text:string
    userInfo?:any
    discordName?:string
    discordId?:string
    sessionId?:string
    sessionInfo?:any
    messageId?:string
    userInfoPioneer?:any
    output?:{
        views:any
        sentences:any
    }
}

let push_sentence = async function(sentence:string,channel:any){
    let tag = TAG+ " | push_sentence | "
    try{
        //send to discord
        let payload = {
            channel,
            responses:{
                sentences:[sentence],
                views:[]
            }
        }

        return true
    }catch(e){
        console.error(e)
    }
}

let push_view = async function(task:any,channel:any){
    let tag = TAG+ " | push_sentence | "
    try{
        let view = {
            type:"task",
            data:task,
            message:task.taskId
        }

        //send to discord
        let payload = {
            channel,
            responses:{
                sentences:[],
                views:[view]
            }
        }
        //publisher.publish('discord-bridge',JSON.stringify(payload))
        return true
    }catch(e){
        console.error(e)
    }
}


// cuild task
let build_task = async function(command){
    const tag = TAG + " | build_task | "
    try{

        let data: Data = {
            query: command,
            queueId: "",
            admin: false,
            dm: false,
            user: "",
            username: "system",
            channel: "system",
            text: command,
            userInfo: undefined,
            discordName: undefined,
            discordId: "system",
            sessionId: "system",
            sessionInfo: {},
            messageId: undefined,
            userInfoPioneer: undefined,
            output: {
                views: undefined,
                sentences: undefined
            }
        };
        //Summarize
        let summary = await ai.buildSummary(data.text, data.sessionInfo)
        if(!summary) throw Error("Missing Summary")
        log.info(tag,"summary: ",summary)
        if(!summary.summary) throw Error("Missing Summary.summary")
        push_sentence("summary: "+summary.summary,data.channel)

        if(summary.needsExternal || summary.needsExecution || true){
            push_sentence("needsExternal: "+summary.needsExternal,data.channel)

            // let workResp = await build_work(data, summary)
            let workResp = await ai.buildTask(summary)
            log.info(tag,"workResp: ",workResp)
            if(!workResp) throw Error("Missing workResp")
            if(!workResp.summary) throw Error("Missing workResp.summary")
            if(!workResp.finalGoal) throw Error("Missing workResp.finalGoal")
            if(!workResp.keywords) throw Error("Missing workResp.keywords")
            if(!workResp.steps) throw Error("Missing workResp.steps")

            //verify all the steps are complete:false
            for(let i = 0; i < workResp.steps.length; i++){
                let step = workResp.steps[i]
                if(step.complete){
                    workResp.steps[i].complete = false
                }
            }

            // create taskId
            let taskId = short.generate()
            //TODO hack removeme
            summary.keywords.push('search')
            let task = {
                taskId,
                discordId:data.discordId,
                sessionId:data.sessionId,
                channel:data.channel,
                owner:data.username,
                keywords:summary.keywords,
                summary:workResp.summary,
                finalGoal:workResp.finalGoal,
                steps:workResp.steps,
                complete:false,
                priority:10
            }
            //checkpoint display to discord
            push_view(task,data.channel)

            let savedTask = await tasksDB.insert(task)
            log.info(tag,"savedTask: ",savedTask)
            return task
        } else {
            log.info(tag,"Does not need external data, solve it now")
            // let solution = await build_solution(data.text)
            let solution = await ai.buildSolution(data.text)
            log.info(tag,"solution: ",solution)
            push_sentence("solution: "+JSON.stringify(solution),data.channel)
        }
    }catch(e){
        log.error(e)
    }
}

const save_skill = async function(skill:any){
    let tag = TAG+" | save_skill | "
    try{
        let skillId = "CMD:0.0.1:" + short.generate();
        if(!skill.script) throw Error("Invalid result! missing script")
        if(!skill.summary) throw Error("Invalid result! missing summary")
        if(!skill.keywords) throw Error("Invalid result! missing keywords")
        if(!skill.inputs) throw Error("Invalid result! missing keywords")

        let entry = {
            created: new Date().getTime(),
            skillId,
            script:skill.script,
            description:skill.summary,
            keywords:skill.keywords
        }
        log.info("entry: ",entry)
        //save to db locally

        //submit to server

        return entry
    }catch(e){
        console.error(e)
        throw e
    }
}

let build_script = async function(objective:any){
    const tag = TAG + " | build_script | "
    try{
        //@TODO get env from db?
        let context = {
            API_KEY:process.env["GOOGLE_SEARCH_API_KEY"],
            OPENAI_API_KEY_4:process.env["OPENAI_API_KEY_4"],
            OPENAI_API_KEY_3:process.env["OPENAI_API_KEY_3"],
            GH_TOKEN:process.env["GH_TOKEN"],
        }
        let contextString = JSON.stringify(context)
        // log.info(tag,"contextString: ",contextString)
        let result = await ai.buildScript(objective, contextString)
        log.info(tag,"result: ",result)
        log.info(tag,"result: ",typeof(result))
        return result
    }catch(e){
        log.error(e)
    }
}

let perform_skill = async function(skill: any, inputs: any) {
    let tag = TAG + " | perform_skill | "
    try {
        //write script to file
        let messages = []
        let cmd = "sh run.sh";

        let writeSuccess = fs.writeFileSync('./run.sh', skill.script);
        log.info(tag, "writeSuccess: ", writeSuccess)
        //make sure file is executable
        //for each input
        for(let i=0;i<inputs.length;i++){
            let input = inputs[i]
            log.info(tag,"input: ",input)
            cmd = cmd + ' "' + input+'"'
        }
        log.info(tag, "cmd: ", cmd)
        try {
            const TIMEOUT_MS = 60000; // 60 seconds

            const startTime = Date.now();
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime > TIMEOUT_MS) {
                throw new Error("Timeout: Script took too long to execute.");
            }

            let {stdout, stderr } = await util.promisify(exec)(cmd);
            log.info(tag, "stdout: ", stdout)
            log.info(tag, "stderr: ", stderr)

            if(stdout && stdout.length > 0 && stdout !== "null\\n"){
                log.info(tag, "Valid Execution: ", stdout)

                messages.push({
                    role: "assistant",
                    content: stdout
                })
            } else if(stderr){
                messages.push({
                    role: "user",
                    content: "that errored: error: " + stderr
                })
            } else if(stdout == "null\\n") {
                messages.push({
                    role: "user",
                    content: "that returned null, you should add error handling to the script"
                })
            } else {
                messages.push({
                    role: "user",
                    content: "something is wrong, not getting any good output"
                })
            }
        } catch(e){
            log.error(tag,"error: ",e)
            messages.push({
                role: "user",
                content: "error: ",e
            })
        }



        return messages
    } catch(e) {
        console.error(e);
        throw e;
    }
}

export async function solve_task(input: string): Promise<void> {
    const tag = TAG + " | solve_task | "
    try{
        console.log(`Solve: ${input}`);

        let result = await build_script(input)
        log.info("result: ",result)
        let skillSaved = await save_skill(result)
        log.info("skillSaved: ",skillSaved)
        //perform solution playbook

        //TODO playbook

        //TODO calculate inputs

        let resultCommand = await perform_skill(skillSaved, [input])
        log.info("resultCommand: ",resultCommand)


        //get task
        // let task = await tasksDB.findOne({taskId})
        // log.info("task: ",task)
        //
        // //get solutions
        // let solutions = task.solutions
        //
        // //TODO related skills
        // let keyword = task.keywords
        // let relatedSkills = await skillsDB.find({keywords:{$in:keyword}})
        // log.info("relatedSkills: ",relatedSkills)
        //
        // //power of 10, always 10 solutions
        // if(solutions.length < 10){
        //     //TODO use AI to better then random select skills?
        //     //select random skill batch
        //
        //     //for each skill in the solution select inputs
        //
        //     //create playbook
        //         //organize skills that need inputs from skills outpus
        //
        //     //create new solution
        //     let result = await build_script(task.finalGoal)
        //     log.info("result: ",result)
        //
        //     //perform solution playbook
        //
        //     //TODO playbook
        //
        //     //
        //     run_command(result.skillId, result.inputs)
        // }


    }catch(e){
        console.error(e)
    }
}


// export async function solve_task(taskId: string): Promise<void> {
//     const tag = TAG + " | handle_input | "
//     try{
//         console.log(`Solve: ${taskId}`);
//
//         //get task
//         let task = await tasksDB.findOne({taskId})
//         log.info("task: ",task)
//
//         //get solutions
//         let solutions = task.solutions
//
//         //TODO related skills
//         let keyword = task.keywords
//         let relatedSkills = await skillsDB.find({keywords:{$any:keyword}})
//         log.info("relatedSkills: ",relatedSkills)
//
//         //power of 10, always 10 solutions
//         if(solutions.length < 10){
//
//             //create new solution
//
//         }
//
//
//     }catch(e){
//         console.error(e)
//     }
// }



export async function handle_input(input: string): Promise<void> {
    const tag = TAG + " | handle_input | "
    try{
        // console.log(`Received input: ${input}`);
        // let result = await build_task(input)
        // log.info(tag,"result: ",result)

        //
        solve_task(input)

        // let result = await run_command(input)
        // handle the input here
        // return result
    }catch(e){
        console.error(e)
    }
}
