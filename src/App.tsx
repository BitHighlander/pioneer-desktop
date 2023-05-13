
import { useState, useEffect } from 'react';
import './App.scss';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/vs2015.css';
const { ipcRenderer } = require('electron');

hljs.registerLanguage('javascript', javascript);

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`);

function App() {
    const [count, setCount] = useState(0);
    const [messages, setMessages] = useState([]);

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
        </div>
    );
}

export default App;
