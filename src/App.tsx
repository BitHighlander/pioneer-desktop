import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    Grid, GridItem,
    Card, CardHeader, CardBody, CardFooter, Text, Divider
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import './App.scss';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/vs2015.css';
const { ipcRenderer } = require('electron');
import axios from 'axios';
hljs.registerLanguage('javascript', javascript);

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`);

axios.defaults.baseURL = 'http://localhost:9001/api/v1';

function App() {
    const [count, setCount] = useState(0);
    const [messages, setMessages] = useState([]);
    const [advancedMode, setAdvancedMode] = useState(false);
    const [editEnv, setEditEnv] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [skills, setSkills] = useState([]);
    const [solutions, setSolutions] = useState([]);
    const [online, setOnline] = useState(false);

    const removeTask = (id) => {
        setTasks(tasks.filter((task) => task.taskId !== id));
    };

    const removeStep = (taskId, stepType) => {
        setTasks(tasks.map((task) => {
            if (task.taskId === taskId) {
                task.steps = task.steps.filter((step) => step.type !== stepType);
            }
            return task;
        }));
    };

    const removeSkill = (skillId) => {
        setSkills(skills.filter((skill) => skill.skillId !== skillId));
    };

    const editTask = (id) => {
        // Add your logic here
    };

    const editStep = (taskId, stepType) => {
        // Add your logic here
    };

    const performSkill = (id:string) => {
        // Add your logic here
        console.log("performSkill Skill: ",id)
    };

    const solveStep = (task:string,step:string) => {
        // Add your logic here
        console.log("solveStep task: ",task)
        console.log("solveStep step: ",step)
    };
    const editSkill = (id) => {
        // Add your logic here
    };

    // const editStep = (SkillId, stepType) => {
    //     // Add your logic here
    // };

    const onStart = async function () {
        try {
            // eslint-disable-next-line no-console
            console.log("onStart())");
            ipcRenderer.on('result-from-main', (event, message) => {
                console.log(message);
                //@ts-ignore
                setMessages([...messages, { text: message, sender: 'agent' }]);
            });

            // Get tasks for user
            // const tasksResponse = await axios.get(`/tasks/${userId}`);
            const tasksResponse = await axios.get(`/tasks`);
            const tasks = tasksResponse.data;
            console.log("tasks",tasks)
            setTasks(tasks);

            //get skills for user
            // const skillsResponse = await axios.get(`/skills`);
            // const skills = skillsResponse.data;
            // console.log("skills",skills)
            // setSkills(skills);

            //get skills by page

            //get solutions for user
            // const solutionsResponse = await axios.get(`/solutions`);
            // const solutions = solutionsResponse.data;
            // console.log("solutions",solutions)

        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e);
        }
    };

    // onstart get data
    useEffect(() => {
        onStart();
    }, []);

    function sendMessage(message:any) {
        // push user message to message array
        //@ts-ignore
        setMessages([...messages, { text: message, sender: 'user' }]);
        // send message to AI agent
        sendToAgent(message);
    }

    function sendToAgent(message:any) {
        // TODO: Implement GPT-3 API call to get response from AI agent
        //@ts-ignore
        setMessages([...messages, { text: message, sender: 'user' }]);
        ipcRenderer.send('message-from-renderer', message);

        // push AI agent response to message array
        // setMessages([...messages, { text: 'kekasd ', sender: 'agent' }]);
    }

    function solveTask(id:string) {
        // TODO: Implement GPT-3 API call to get response from AI agent
        console.log("solveTask id: ",id)
        //@ts-ignore
        // setMessages([...messages, { text: message, sender: 'user' }]);
        ipcRenderer.send('solve-task', id);

        // push AI agent response to message array
        // setMessages([...messages, { text: 'kekasd ', sender: 'agent' }]);
    }

    return (
        <div className='App'>
            <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
            >
                <GridItem rowSpan={2} colSpan={1} bg='green'>

                </GridItem>
                {/*<GridItem colSpan={2} bg='papayawhip' ></GridItem>*/}
                {/*<GridItem colSpan={2} bg='papayawhip' ></GridItem>*/}
                <GridItem colSpan={4}  >
                    <Card>
                        <cardHeader>
                            <Text> <h2>Do anything 😎</h2></Text>
                        </cardHeader>
                        <CardBody>
                            <div className='chat-window'>
                                {messages.map((message:any, index) => (
                                    <div key={index} className={`message ${message.sender}`}>
                                        <p>{message.sender}:  {message.text}</p>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className='input-box'>
                                <input type='text' placeholder='Type a message...' onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        // @ts-ignore
                                        sendMessage(event.target.value);
                                        // @ts-ignore
                                        event.target.value = '';
                                    }
                                }} />
                            </div>
                            <button onClick={() => {
                                const input = document.querySelector('input[type="text"]');
                                // @ts-ignore
                                sendMessage(input.value);
                                // @ts-ignore
                                input.value = '';
                            }}>Send</button>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem colSpan={4} style={{ display: 'flex', alignItems: 'flex-end' }} >
                    <Card>
                        <CardBody>
                            {advancedMode ? (
                                <div>
                                    Advanced mode on
                                    <Tabs>
                                        <TabList>
                                            <Tab>Tasks</Tab>
                                            <Tab>Skills</Tab>
                                            <Tab>Solutions</Tab>
                                        </TabList>

                                        <TabPanels>
                                            <TabPanel>
                                                <p>Tasks!</p>

                                                <Accordion>
                                                    {tasks.map((task) => (
                                                        <AccordionItem key={task.taskId}>
                                                            <h2>
                                                                <AccordionButton>
                                                                    <h2>TaskId: </h2><small><Box as="span" flex='1' textAlign='left'>{task.taskId}</Box></small>
                                                                    <Button onClick={() => editTask(task.taskId)}>Edit Task</Button>
                                                                    <Button onClick={() => removeTask(task.taskId)}>Remove Task</Button>
                                                                    <Button onClick={() => solveTask(task.taskId)}>Solve Task</Button>
                                                                    <AccordionIcon />
                                                                </AccordionButton>
                                                            </h2>
                                                            <AccordionPanel pb={4}>
                                                                {task.summary}

                                                                <Accordion allowToggle>
                                                                    {task.steps.map((step) => (
                                                                        <AccordionItem key={step.type}>
                                                                            <h2>
                                                                                <AccordionButton>
                                                                                    <Box as="span" flex='1' textAlign='left'>{step.type}</Box>
                                                                                    <AccordionIcon />
                                                                                </AccordionButton>
                                                                            </h2>
                                                                            <AccordionPanel pb={4}>
                                                                                {step.summary}
                                                                                <Button onClick={() => editStep(task.taskId, step.type)}>Edit Step</Button>
                                                                                <Button onClick={() => removeStep(task.taskId, step.type)}>Remove Step</Button>
                                                                                <Button onClick={() => solveStep(task.taskId)}>Solve Task</Button>
                                                                            </AccordionPanel>
                                                                        </AccordionItem>
                                                                    ))}
                                                                </Accordion>
                                                            </AccordionPanel>
                                                        </AccordionItem>
                                                    ))}
                                                </Accordion>

                                            </TabPanel>
                                            <TabPanel>
                                                <p>Skills!</p>
                                                <Accordion>
                                                    {skills.map((skill) => (
                                                        <AccordionItem key={skill?.skillId}>
                                                            <h2>
                                                                <AccordionButton>
                                                                    <h2>SkillId: </h2>
                                                                    <small>
                                                                        <Box as="span" flex='1' textAlign='left'>{skill.skillId}</Box>
                                                                    </small>
                                                                    <Button onClick={() => editSkill(skill.skillId)}>Edit Skill</Button>
                                                                    <Button onClick={() => removeSkill(skill.skillId)}>Remove Skill</Button>
                                                                    <Button onClick={() => performSkill(skill.skillId)}>Perform Skill</Button>
                                                                    <AccordionIcon />
                                                                </AccordionButton>
                                                            </h2>
                                                            <AccordionPanel pb={4}>
                                                                {skill?.summary}

                                                                <Accordion allowToggle>
                                                                    <AccordionItem key="inputs">
                                                                        <h2>
                                                                            <AccordionButton>
                                                                                <Box as="span" flex='1' textAlign='left'>Inputs</Box>
                                                                                <AccordionIcon />
                                                                            </AccordionButton>
                                                                        </h2>
                                                                        <AccordionPanel pb={4}>
                                                                            <ul>
                                                                                {/*{skill?.inputs.map((input) => (*/}
                                                                                {/*    <li key={input.name}>*/}
                                                                                {/*        <strong>{input.name}</strong>: {input.description}*/}
                                                                                {/*    </li>*/}
                                                                                {/*))}*/}
                                                                            </ul>
                                                                        </AccordionPanel>
                                                                    </AccordionItem>

                                                                    <AccordionItem key="outputs">
                                                                        <h2>
                                                                            <AccordionButton>
                                                                                <Box as="span" flex='1' textAlign='left'>Outputs</Box>
                                                                                <AccordionIcon />
                                                                            </AccordionButton>
                                                                        </h2>
                                                                        <AccordionPanel pb={4}>
                                                                            <ul>
                                                                                {/*{Object.entries(skill?.outputMap).map(([key, value]) => (*/}
                                                                                {/*    <li key={key}>*/}
                                                                                {/*        <strong>{key}</strong>: {value}*/}
                                                                                {/*    </li>*/}
                                                                                {/*))}*/}
                                                                            </ul>
                                                                        </AccordionPanel>
                                                                    </AccordionItem>

                                                                    <AccordionItem key="keywords">
                                                                        <h2>
                                                                            <AccordionButton>
                                                                                <Box as="span" flex='1' textAlign='left'>Keywords</Box>
                                                                                <AccordionIcon />
                                                                            </AccordionButton>
                                                                        </h2>
                                                                        <AccordionPanel pb={4}>
                                                                            {skill.keywords.join(", ")}
                                                                        </AccordionPanel>
                                                                    </AccordionItem>
                                                                </Accordion>
                                                            </AccordionPanel>
                                                        </AccordionItem>
                                                    ))}
                                                </Accordion>
                                            </TabPanel>
                                            <TabPanel>
                                                <p>Solutions!</p>
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </div>
                            ) : (<div>
                            </div>)}
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <Button size='xs' onClick={() => setAdvancedMode(!advancedMode)}>
                                {advancedMode ? 'Disable' : 'Enable'} Advanced Mode
                            </Button>
                        </CardFooter>
                    </Card>
                </GridItem>
            </Grid>
        </div>
    );
}

export default App;
