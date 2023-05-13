let TAG = " EXE "
const { exec } = require('child_process');
require('dotenv').config()
console.log("USING USE_GPT_4")
const util = require('util');
const { Configuration, OpenAIApi } = require("openai");
const short = require('short-uuid');
let OPENAI_API_KEY = process.env.OPENAI_API_KEY
if(!OPENAI_API_KEY) throw Error("missing OPENAI_API_KEY")
let configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const os = require('os');

const openai = new OpenAIApi(configuration);
let fs = require('fs')
// command to execute
const cmd = 'ls';

// let run_command = async function(command){
//     let tag = TAG + " | run_command | "
//     try {
//         let isGoodSolution = false;
//         let output = "";
//
//         //get system info
//         let systemInfo = os.platform()
//
//         let messages = [
//             {
//                 role: "system",
//                 content: "write only bash commands for "+systemInfo+" and have no extra strings or creatures, do not comment, do not write anything you do not intent to wrote out into the file. it will be passed directly into fs.writeFile"
//             },
//             {
//                 role: "user",
//                 content: "write a bash script that " + command + " include error logging and proper error handling"
//             }
//         ]
//
//         while (!isGoodSolution) {
//             let response = await openai.createChatCompletion({
//                 model: "gpt-4",
//                 messages
//             });
//             // log.info(tag,"response.data.choices[0]",response.data.choices[0])
//             // log.info(tag,"response.data.choices[0]",response.data.choices[0].message)
//             console.log(tag,"response.data.choices[0]",response.data.choices[0].message.content)
//             let scriptContent = response.data.choices[0].message.content
//             if(scriptContent){
//                 let scriptId = "CMD:S:" + short.generate();
//                 let scriptEntry = {
//                     scriptId,
//                     command,
//                     script: response.data.choices[0].message.content
//                 }
//                 //scriptsDB.insert(scriptEntry);
//                 fs.writeFileSync("test.sh", response.data.choices[0].message.content);
//
//                 let cmd = "sh test.sh";
//                 try {
//                     let result = await util.promisify(exec)(cmd)
//                     console.log(tag,"result:",result)
//                     return result
//
//                     // console.log(tag, "stdout: ", stdout)
//                     // console.log(tag, "stderr: ", stderr)
//                     // console.log(tag, "stderr: ", error)
//                     isGoodSolution = true
//                 } catch(e){
//                     console.error(e)
//                 }
//
//             } else {
//                 messages.push({
//                     role: "user",
//                     content: response.data.choices[0].message.content + " failed with error: empty response"
//                 });
//             }
//
//         }
//     } catch(e) {
//         console.error(e);
//         throw e;
//     }
// }

//create task

// find related skills

// if found run skills

// create solution

// run solution

// return solution

export async function handle_input(input: string): Promise<void> {
    try{
        console.log(`Received input: ${input}`);
        // let result = await run_command(input)
        // handle the input here
        // return result
    }catch(e){
        console.error(e)
    }
}
