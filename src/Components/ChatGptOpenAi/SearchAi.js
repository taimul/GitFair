import React, { useState } from 'react';
import bot from "../../assets/searchAI/bot.svg"
import user from "../../assets/searchAI/user.svg"
import send from "../../assets/searchAI/send.svg"
import axios from 'axios';


const SearchAi = () => {

    const [searchInputText, setSearchInputText] = useState();
    const [chatLog, setChatLog] = useState([
        {
            uniqueId: "",
            question: "Hello Sir,",
        },
        {
            uniqueId: "",
            answer: "How Can I Help You?",
        }
    ]);
    // console.log(chatLog);

    // loading function ---
    const loader = element => {
        element.textContent = "";
        // loading show ... after 2 milliseconds ---
        let loadInterval = setInterval(() => {
            element.textContent += ".";
            // if the loading indicator has reached five dots, then reset it---
            if (element.textContent === "....") {
                element.textContent = "";
            }
        }, 200)
    };

    // // text typed every 20 millisecond---
    // const typeText = (element, text) => {
    //     let index = 0;
    //     let interval = setInterval(() => {
    //         if (index < text.length) {
    //             element.innerHtml += text.chartAt(index);
    //             index++;
    //         } else {
    //             clearInterval(interval);
    //         }
    //     }, 20)
    // };



    function chatStripe(isAi, value, uniqueId) {
        return (
            `
            <div class="wrapper ${isAi && 'ai'}">
                <div class="chat">
                    <div class="profile">
                        <img
                          src=${isAi ? bot : user}
                          alt="${isAi ? 'bot' : 'user'}"
                        />
                    </div>
                    <div class="message" id=${uniqueId}>${value}</div>
                </div>
            </div>
        `
        )
    }

    // after clicking the arrow sign this function is executed----




    // after clicking the arrow sign this function is exicuted----
    const handleOpenAiChatGptFunction = () => {

        if (searchInputText) {
            setSearchInputText({ text: "" });


            // generate unique Id for each async.. ---
            const generateUniqueId = () => {
                const timeStamp = Date.now();
                const randomNumber = Math.random();
                const hexadecimalString = randomNumber.toString(16);
                return `id-${timeStamp}-${hexadecimalString}`;
            };

            // get uniqueId from uniqueId function ----
            const uniqueId = generateUniqueId();
            // insert ans to the useState ---
            setChatLog([...chatLog, {
                uniqueId: "",
                question: searchInputText?.text,
            }, {
                uniqueId: uniqueId,
                answer: "loading...",
            }]);
            // const element = document.getElementById(uniqueId);
            // console.log("id paise:", element);


            // setChatLog([...chatLog, {
            //     uniqueId: "",
            //     question: searchInputText?.text,
            // }])

            const chatContainer = document.getElementById("input-ask-ans");
            // chatContainer.innerHTML += chatStripe(false, searchInputText)

            // setChatLog([...chatLog, {
            //     uniqueId: uniqueId,
            //     user: `${searchInputText?.text}`,
            //     message: "m2",
            // }])
            let loadInterval;
            setTimeout(() => {
                const element = document.getElementById(uniqueId);
                loadInterval = setInterval(() => {
                    if (element.textContent === "......") {
                        element.innerText = "";
                    } else {
                        element.textContent += ".";
                    }
                }, 300)
            }, 100);
            const url = `${process.env.REACT_APP_URL_CHAT_GPT}/searchai`
            axios.post(url, { prompt: searchInputText?.text })
                .then(res => {
                    const element = document.getElementById(uniqueId);
                    // console.log("id paise:", element);

                    const data = res?.data?.bot?.trim()
                    // console.log("this is axios back:", data);
                    // setSearchInputText({ text: "" });



                    // // insert ans to the useState ---
                    // setChatLog([...chatLog, {
                    //     uniqueId: "",
                    //     question: searchInputText?.text,
                    // }, {
                    //     uniqueId: uniqueId,
                    //     answer: data,
                    // }])
                    // document.getElementById(uniqueId).innerText = data;
                    // typeText(element, data)
                    clearInterval(loadInterval)
                    element.innerText = "";
                    // text typed every 20 millisecond---
                    const typeText = (element, text) => {
                        let index = 0;
                        let interval = setInterval(() => {
                            if (index < text.length) {
                                element.innerHTML += text.charAt(index);
                                index++;
                            } else {
                                clearInterval(interval);
                            }
                        }, 20)
                    };

                    typeText(element, data)
                    // console.log("function shesh");

                }).catch(error => console.log(error))
            // console.log({ searchInputText });
            // setSearchInputText("");
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            // console.log("object");
            handleOpenAiChatGptFunction();
        }
    }

    return (
        <div
            className='flex flex-col items-center bg-black justify-between chatgpt'
        >
            <div
                id='input-ask-ans'
                className='w-full max-w-[1280px] mx-auto'>

                {chatLog && chatLog.map((chat, index) => <ChatMessage key={index} chat={chat} />)}

                {/* <div className='flex gap-2 items-center p-5'>
                    <img src={user} alt="" className='bg-blue-600 p-2' /> <p>This is ans text</p>
                </div>
                <div className='flex gap-2 items-center p-5 bg bg-[#40414F]'>
                    <img src={bot} alt="" className='bg-emerald-600 p-2' /> <p>This is ans text</p>
                </div> */}
            </div>
            <div
                className=' p-2 w-full  flex gap-2 bg-[#40414F] rounded-sm max-w-[1280px] mx-auto mt-4'
            >
                <textarea
                    required
                    placeholder='Ask Git-Fair AI'
                    name="searchInputText"
                    cols="30" rows="1"
                    className='p-2 w-full bg-[#40414F] text-white h-10 border-0 outline-none'
                    value={searchInputText?.text}
                    // set input text value on use state -------
                    onChange={(e) => setSearchInputText({ text: e?.target?.value })}
                    onKeyDown={handleKeyDown}
                >
                </textarea>
                <button className=''>
                    <img
                        src={send} alt="send-button" className=' w-10'

                        // on click button which is arrow sign / click function -----
                        onClick={handleOpenAiChatGptFunction}
                    />
                </button>
            </div>
        </div>
    );
};

const ChatMessage = ({ chat }) => {
    return (
        <>
            {chat?.question ?
                <div className='flex gap-2 items-center p-5'>
                    <img src={user} alt="" className='bg-blue-600 p-2' />
                    <p>{chat?.question}</p>
                </div>
                :
                <div className='flex gap-2 items-center p-5 bg bg-[#40414F]' >
                    <img src={bot} alt="" className='bg-emerald-600 p-2' />
                    <p id={`${chat?.uniqueId ? chat?.uniqueId : ""}`}>{chat?.answer}</p>
                </div>
            }

        </>
    );
}



export default SearchAi;