import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import './App.scss';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/vs2015.css';
const { ipcRenderer } = require('electron');

hljs.registerLanguage('javascript', javascript);

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`);

let sample_tasks = [
    {
        "_id": {
            "$oid": "6456c2a182c5d5d6b2cc672b"
        },
        "taskId": "pJHMmQRLsy9xMUKAoQfR97",
        "discordId": null,
        "sessionId": "faa1a320-c308-4c31-a3de-13cb313d5006",
        "channel": "1090511307524034642",
        "owner": "highlander",
        "keywords": [
            "Moscow",
            "two days ago",
            "retaliate",
            "search"
        ],
        "summary": "Analyzing the keywords in the query to identify relevant events that occurred in Moscow two days ago, analyzing the data gathered from external sources to see if Moscow is likely to retaliate and creating a summary of the findings",
        "finalGoal": "Create a summary of the findings, including any relevant information about the events in Moscow two days ago and whether or not Moscow is likely to retaliate.",
        "steps": [
            {
                "type": "Checking for external data sources",
                "inputs": [],
                "action": "Determine which external data sources are necessary and use them to gather the relevant data.",
                "summary": "Checking for external data sources to gather the relevant data.",
                "complete": false,
                "keywords": []
            },
            {
                "type": "Analyze the keywords",
                "inputs": [],
                "action": "Analyze the keywords in the query to identify relevant events that occurred in Moscow two days ago.",
                "summary": "Analyzing the keywords in the query to identify relevant events that occurred in Moscow two days ago.",
                "complete": false,
                "keywords": [
                    "Moscow",
                    "relevant events"
                ]
            },
            {
                "type": "Analyze the data",
                "inputs": [],
                "action": "Analyze the data gathered from the external sources to see if Moscow is likely to retaliate.",
                "summary": "Analyzing the data gathered from the external sources to see if Moscow is likely to retaliate.",
                "complete": false,
                "keywords": [
                    "Moscow",
                    "retaliate"
                ]
            },
            {
                "type": "Create a summary",
                "inputs": [],
                "action": "Create a summary of the findings, including any relevant information about the events in Moscow two days ago and whether or not Moscow is likely to retaliate.",
                "summary": "Create a summary of the findings, including any relevant information about the events in Moscow two days ago and whether or not Moscow is likely to retaliate.",
                "complete": false,
                "keywords": [
                    "Moscow",
                    "retaliate",
                    "relevant events"
                ]
            }
        ],
        "complete": true,
        "priority": 10,
        "solution": {
            "solution": "A recent alleged drone attack targeted Russian President Vladimir Putin's residence, and Moscow has threatened to retaliate against Ukraine for the failed attempt. Two drones were allegedly used in the attack. Russia's presidential press service accused both Ukraine and the U.S. of involvement, labeling the incident a terrorist act and vowing to retaliate as it sees fit.",
            "solved": true,
            "summary": "Alleged drone attack on Putin's residence incites Moscow to threaten retaliation against Ukraine; Russia accuses Ukraine and the U.S. of involvement.",
            "keywords": [
                "Moscow",
                "drone attack",
                "Putin",
                "retaliate",
                "Ukraine",
                "U.S."
            ]
        },
        "aborted": true
    },
    {
        "_id": {
            "$oid": "6456ce9462e9b212d9cb0681"
        },
        "taskId": "5wBjUtMNDgKtxgCRzZqSaW",
        "discordId": null,
        "sessionId": "faa1a320-c308-4c31-a3de-13cb313d5006",
        "channel": "1090511307524034642",
        "owner": "highlander",
        "keywords": [
            "Dogecoin",
            "first",
            "block",
            "hash",
            "link",
            "search"
        ],
        "summary": "Search for, identify, retrieve, validate, and store the first block hash for Dogecoin",
        "finalGoal": "Store the retrieved data in a secure database",
        "steps": [
            {
                "type": "search",
                "inputs": [
                    "Dogecoin first block hash"
                ],
                "action": "Search for",
                "summary": "Search for Dogecoin first block hash on an external search engine",
                "complete": false,
                "keywords": [
                    "Dogecoin",
                    "first block hash"
                ]
            },
            {
                "type": "identify",
                "inputs": [
                    "Dogecoin first block hash"
                ],
                "action": "Identify",
                "summary": "Identify a reliable source for the desired information",
                "complete": false,
                "keywords": [
                    "Dogecoin",
                    "first block hash"
                ]
            },
            {
                "type": "retrieve",
                "inputs": [
                    "Dogecoin first block hash"
                ],
                "action": "Retrieve",
                "summary": "Retrieve the first block hash for Dogecoin from the identified source",
                "complete": false,
                "keywords": [
                    "Dogecoin",
                    "first block hash"
                ]
            },
            {
                "type": "retrieve",
                "inputs": [
                    "Dogecoin first block hash"
                ],
                "action": "Retrieve",
                "summary": "Retrieve the link to the first block hash for Dogecoin from the identified source",
                "complete": false,
                "keywords": [
                    "Dogecoin",
                    "first block hash"
                ]
            },
            {
                "type": "validate",
                "inputs": [
                    "Dogecoin first block hash"
                ],
                "action": "Validate",
                "summary": "Validate the retrieved data for accuracy",
                "complete": false,
                "keywords": [
                    "Dogecoin",
                    "first block hash"
                ]
            },
            {
                "type": "store",
                "inputs": [
                    "Dogecoin first block hash"
                ],
                "action": "Store",
                "summary": "Store the retrieved data in a secure database",
                "complete": false,
                "keywords": [
                    "Dogecoin",
                    "first block hash"
                ]
            }
        ],
        "complete": true,
        "priority": 10,
        "result": [
            {
                "role": "assistant",
                "content": "\nchanged 96 packages, and audited 97 packages in 541ms\n\n20 packages are looking for funding\n  run `npm fund` for details\n\n1 moderate severity vulnerability\n\nSome issues need review, and may require choosing\na different dependency.\n\nRun `npm audit` for details.\n{ \"success\": true, \"output\": [\n  {\n    \"title\": \"[PDF] Build Your Own Search String - Google\",\n    \"link\": \"https://www.google.com/educators/activities/Search_kwatkins.pdf\",\n    \"snippet\": \"Good String, Better Results​​ Within a page, use the find command (Ctrl F) to search for your terms. Certain Google features (Google News and Google Groups) ...\"\n  },\n  {\n    \"title\": \"Refine web searches - Google Search Help\",\n    \"link\": \"https://support.google.com/websearch/answer/2466433?hl=en\",\n    \"snippet\": \"Refine web searches. You can use symbols or words in your search to make your search results more precise. Google Search usually ignores punctuation ...\"\n  },\n  {\n    \"title\": \"How to Do Research: A Step-By-Step Guide: 2a. Search Strategies\",\n    \"link\": \"https://libguides.elmira.edu/research/search_strategies\",\n    \"snippet\": \"Sep 30, 2022, · ,To retrieve the most relevant search results, you will need to construct a search string. A search string is a combination of keywords, ...\"\n  },\n  {\n    \"title\": \"Sourcing on Google: Boolean search strings for recruiters | Workable\",\n    \"link\": \"https://resources.workable.com/tutorial/source-google-boolean\",\n    \"snippet\": \"Using Google Boolean search strings for recruiters will improve your search results and eventually get you closer to your potential candidates.\"\n  },\n  {\n    \"title\": \"36 Google Search tricks to find exactly what you're looking for - Zapier\",\n    \"link\": \"https://zapier.com/blog/advanced-google-search-tricks/\",\n    \"snippet\": \"Mar 30, 2023, · ,Need to narrow down your search results? Use these 36 Google Search tips and tricks to find exactly what you need—without ever clicking into ...\"\n  },\n  {\n    \"title\": \"Google Tricks That Will Change the Way You Search - TIME\",\n    \"link\": \"https://time.com/4116259/google-search-2/\",\n    \"snippet\": \"Feb 3, 2016, · ,This one's a well-known, simple trick: searching a phrase in quotes will yield only pages with the same words in the same order as what's in the ...\"\n  },\n  {\n    \"title\": \"Creating Search Strings - YouTube\",\n    \"link\": \"https://www.youtube.com/watch?v=ApO74wws014\",\n    \"snippet\": \"Mar 27, 2020, · ,This video explains how to create complex search strings to narrow down your results when ...,,Duration: ,6:17,,Posted: ,Mar 27, 2020\"\n  },\n  {\n    \"title\": \"Creating a Search String - YouTube\",\n    \"link\": \"https://www.youtube.com/watch?v=CfUdu6ribSU\",\n    \"snippet\": \"Apr 17, 2018, · ,What are Boolean Operators and how do I use them in my research? In this video, you'll ...,,Duration: ,4:14,,Posted: ,Apr 17, 2018,Missing:  ,results, | Must include:,results\"\n  },\n  {\n    \"title\": \"20 advanced Google search operators you need to know\",\n    \"link\": \"https://searchengineland.com/advanced-google-search-operators-388355\",\n    \"snippet\": \"Oct 3, 2022, · ,You will get more than 730 million results! However, if you use the allintitle operator, which is one of the advanced Google search operators we ...\"\n  },\n  {\n    \"title\": \"HOW TO: Build the ultimate search string - Agility PR Solutions\",\n    \"link\": \"https://www.agilitypr.com/pr-news/pr-tools/build-ultimate-search-string/\",\n    \"snippet\": \"Jun 16, 2016, · ,When originally building your search strings, make sure to not limit your coverage. Start with what you need, then add your dependent keywords ...\"\n  }\n], \"summary\": \"Google search results for the query: Write a google search string that will give you the results you are looking for\" }"
            }
        ],
        "solution": {
            "solution": "Use the search string 'Dogecoin first block hash' to retrieve the information",
            "solved": true,
            "summary": "Search for Dogecoin first block hash to find the desired information",
            "keywords": [
                "Dogecoin",
                "first block hash",
                "search string"
            ]
        }
    }
]

let sample_skills = [{
    "_id": {
        "$oid": "6450382bb89a3813a7517daf"
    },
    "script": "#!/bin/bash\n\nRESPONSE_FILE=\"results.json\"\nQUERY=\"$1\"\n\n# Install google-it package if not already installed\n( npm install -g @schneehertz/google-it ) 2> /dev/null\n\n# Perform Google search and save results to response file\n( google-it --query=\"$QUERY\" -o \"$RESPONSE_FILE\" -n ) 2> /dev/null\n\n# Read the response file and store it in a variable\nRESULT=$(cat \"$RESPONSE_FILE\")\n\n# Remove the response file\nrm \"$RESPONSE_FILE\"\n\n# Print the results in JSON format\nprintf '{ \"success\": true, \"output\": %s, \"summary\": \"Google search results for the query: %s\" }' \"$RESULT\" \"$QUERY\"",
    "inputsCount": 1,
    "inputs": [
        {
            "position": 1,
            "name": "searchParams",
            "description": "Write a google search string that will give you the results you are looking for",
            "example": "what is a keepkey?"
        }
    ],
    "outputs": {
        "results": [
            "an array of search results order by relevance"
        ]
    },
    "outputMap": {
        "success": "Boolean value; true if the query was successful",
        "output": "Array of search results ordered by relevance",
        "summary": "Brief summary of the search results"
    },
    "summary": "A skill that searches Google and returns results in JSON format using the google-it CLI",
    "keywords": [
        "bash",
        "script",
        "google-it",
        "search",
        "google",
        "json",
        "results"
    ],
    "skillId": "CMD:0.0.1:highlander:google-search"
    },{
    "_id": {
        "$oid": "6459b16e027a2fd0449ed8f6"
    },
    "created": 1683599726194,
    "skillId": "CMD:0.0.1:5fMuEa4tA8fMaXmWLKJzFb",
    "script": "#!/bin/bash\n\n# Install required packages\nif ! command -v curl &> /dev/null; then\n  echo 'curl is not installed, installing now...'\n  brew install curl\nfi\nif ! command -v pup &> /dev/null; then\n  echo 'pup is not installed, installing now...'\n  brew install pup\nfi\nif ! command -v jq &> /dev/null; then\n  echo 'jq is not installed, installing now...'\n  brew install jq\nfi\n\n# Fetch and parse HTML\nurl=\"$1\"\nhtml_output=$(curl -s \"${url}\")\njson_output=$(echo \"$html_output\" | pup 'p json{}' | jq -s '. | {success: true, output: ., summary: \"Parsed HTML and returned JSON of important data.\"}')\necho \"$json_output\"",
    "description": "A bash script that loads a webpage, parses the HTML, and returns JSON of important data.",
    "keywords": [
        "bash script",
        "webpage",
        "parse HTML",
        "JSON"
    ]
}]

let sample_solutions = []

function App() {
    const [count, setCount] = useState(0);
    const [messages, setMessages] = useState([]);
    const [advancedMode, setAdvancedMode] = useState(false);
    const [tasks, setTasks] = useState(sample_tasks);
    const [skills, setSkills] = useState(sample_skills);

    const removeTask = (id) => {
        setTasks(tasks.filter((task) => task._id.$oid !== id));
    };

    const removeStep = (taskId, stepType) => {
        setTasks(tasks.map((task) => {
            if (task._id.$oid === taskId) {
                task.steps = task.steps.filter((step) => step.type !== stepType);
            }
            return task;
        }));
    };

    const removeSkill = (skillId) => {
        setSkills(skills.filter((skill) => skill.skillId !== skillId));
    };

    const solveTask = (id:string) => {
        // Add your logic here
        console.log("Solveing task: ",id)
    };

    const editTask = (id) => {
        // Add your logic here
    };

    const editStep = (taskId, stepType) => {
        // Add your logic here
    };

    const solveSkill = (id:string) => {
        // Add your logic here
        console.log("Solveing Skill: ",id)
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

    return (
        <div className='App'>
            <h2>Do anything 😎</h2>

            {/*<Update />*/}

            <div className='chat-window'>
                {messages.map((message:any, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        <p>{message.sender}:  {message.text}</p>
                    </div>
                ))}
            </div>

            <div className='input-box'>
                <input type='text' placeholder='Type a message...' onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        // @ts-ignore
                        sendMessage(event.target.value);
                        // @ts-ignore
                        event.target.value = '';
                    }
                }} />
                <button onClick={() => {
                    const input = document.querySelector('input[type="text"]');
                    // @ts-ignore
                    sendMessage(input.value);
                    // @ts-ignore
                    input.value = '';
                }}>Send</button>
            </div>
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
                                        <AccordionItem key={task._id.$oid}>
                                            <h2>
                                                <AccordionButton>
                                                    <h2>TaskId: </h2><small><Box as="span" flex='1' textAlign='left'>{task.taskId}</Box></small>
                                                    <Button onClick={() => editTask(task._id.$oid)}>Edit Task</Button>
                                                    <Button onClick={() => removeTask(task._id.$oid)}>Remove Task</Button>
                                                    <Button onClick={() => solveTask(task._id.$oid)}>Solve Task</Button>
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
                                                                <Button onClick={() => editStep(task._id.$oid, step.type)}>Edit Step</Button>
                                                                <Button onClick={() => removeStep(task._id.$oid, step.type)}>Remove Step</Button>
                                                                <Button onClick={() => solveStep(task._id.$oid)}>Solve Task</Button>
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
                                        <AccordionItem key={skill._id.$oid}>
                                            <h2>
                                                <AccordionButton>
                                                    <h2>SkillId: </h2>
                                                    <small>
                                                        <Box as="span" flex='1' textAlign='left'>{skill.skillId}</Box>
                                                    </small>
                                                    <Button onClick={() => editSkill(skill._id.$oid)}>Edit Skill</Button>
                                                    <Button onClick={() => removeSkill(skill._id.$oid)}>Remove Skill</Button>
                                                    <Button onClick={() => solveSkill(skill._id.$oid)}>Solve Skill</Button>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </h2>
                                            <AccordionPanel pb={4}>
                                                {/*{skill?.summary}*/}

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
                Advanced mode off
            </div>)}

            <Button onClick={() => setAdvancedMode(!advancedMode)}>
                {advancedMode ? 'Disable' : 'Enable'} Advanced Mode
            </Button>

        </div>
    );
}

export default App;
