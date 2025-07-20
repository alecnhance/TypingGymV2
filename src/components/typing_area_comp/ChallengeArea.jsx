import React, { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';
import InnerTyping from './InnerTyping';
import ProgressBar from './ProgressBar';
import { set } from 'date-fns';
import custom from '../../assets/customize.svg';
import { hover } from 'framer-motion';

const LockIcon = ({ size = 24, color = "currentColor", locked = true, className="" }) => (
    <div className={className}>
        <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <rect
            x="5"
            y="11"
            width="14"
            height="10"
            rx="2"
            stroke={color}
            strokeWidth="2"
        />
        <path
            d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
            stroke={color}
            strokeWidth="2"
        />
        {locked && (
            <circle cx="12" cy="15" r="1" fill={color} />
        )}
        </svg>
    </div>
  );

const formatTime = (ms) => {
    const min = Math.floor(ms / 60000);
    const seconds = Math.floor(ms / 1000);
    const sec = seconds - (min * 60);
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

const ChallengeArea = () => {
    // const [selectedOption, setSelectedOption] = useState('Random');
    const [progress, setProgress] = useState(0);
    const innerTypingRef = useRef(null); 
    const [redCount, setRedCount] = useState(0);
    const [spaceMisses, setSpaceMisses] = useState(new Set());
    const [totalTime, setTotalTime] = useState(0);
    const [numTyped, setNumTyped] = useState(0);
    const [numWrong, setNumWrong] = useState(0);
    // const [wordCount, setWordCount] = useState(10);
    const [started, setStarted] = useState(false);
    const [hoveringStart, setHoveringStart] = useState(false);

    useEffect(() => {
        //resetPrompt();
        setColorDict(initColorDict(prompt));
    }, [])

    const [inputText, setInputText] = useState('');
    const samplePrompt = "This is a sample prompt that I am testing out";
    const [prompt, setPrompt] = useState(samplePrompt);
    const initColorDict = (curr) => {
        const samplePromptSplit = curr.split("");
        return samplePromptSplit.map((_, index) => index).reduce((acc, val) => {
            acc[val] = "text-headerGray";
            return acc;
        }, {});
    }
    const [colorDict, setColorDict] = useState(initColorDict(prompt));

    // const handleRestart = () => {
    //     setInputText("");
    //     setColorDict(initColorDict(prompt));
    //     setRedCount(0);
    //     setProgress(0);
    //     setTotalTime(0);
    //     setNumTyped(0);
    //     setNumWrong(0);
    //     innerTypingRef.current?.focus();
    //     innerTypingRef.current?.resetTimer();
    // }

    // const resetPrompt = () => {
    //     if (selectedOption === "Random") {
    //         makeRandomPrompt();
    //     }
    // }

    // const makeRandomPrompt = (count = wordCount) => {
    //     fetch('/words.txt')
    //         .then(res => res.text())
    //         .then(text => {
    //             const words = text.split('\n');
    //             let string = "";
    //             for (let i = 0; i < count; i++) {
    //                 const index = Math.floor(Math.random() * words.length);
    //                 string += words[index] + ' ';
    //             }
    //             setPrompt(string.slice(0, string.length - 1));
    //             setColorDict(initColorDict(string.slice(0, string.length - 1)));
    //         })
    // }

    const getWPM = () => {
        const characters = inputText.length;
        const words = characters / 5;
        const minutes = totalTime / 60000;
        if (characters === 0 || minutes === 0) {
            return 0;
        }
        return Math.floor(words/minutes);
    }

    const getAccuracy = () => {
        return numTyped > 0 ? Math.floor(((numTyped - numWrong) / numTyped) * 100) : 100;
    }

    // const handleNewPrompt = () => {
    //     resetPrompt();
    //     handleRestart();
    // }

    // const handleRandomButtons = (item) => {
    //     setWordCount(item);
    //     makeRandomPrompt(item);
    //     handleRestart();
    // }


    return(
        <div className='relative'>
            <div className="absolute -inset-1 bg-navOrange rounded-3xl blur opacity-75 animate-pulse"></div>
            <div className="relative flex flex-col w-full h-full  bg-headerGray rounded-3xl h-auto p-8">
                <h2 className="w-full mb-3 font-bold text-2xl">Daily Challenge</h2>
                <div className="flex justify-between w-full mb-3 items-right">
                    <h2>WPM: {getWPM()}</h2>
                    <h2>Accuracy: {getAccuracy()}%</h2>
                </div>
                {started && 
                    <InnerTyping 
                        ref={innerTypingRef}
                        inputText={inputText}
                        onInputChange={setInputText}
                        colorDict={colorDict}
                        onColorChange={setColorDict}
                        prompt={prompt}
                        setPrompt={setPrompt}
                        redCount={redCount}
                        setRedCount={setRedCount}
                        spaceMisses={spaceMisses}
                        setSpaceMisses={setSpaceMisses}
                        setTotalTime={setTotalTime}
                        setProgress={setProgress}
                        numTyped={numTyped}
                        setNumTyped={setNumTyped}
                        numWrong={numWrong}
                        setNumWrong={setNumWrong}
                        textSize={"text-4xl"}
                        minBoxSize={"45vh"}
                    />
                }
                {!started && 
                    <div
                        className={`bg-gray-400 rounded-3xl py-4 px-4 w-full`}
                        style={{ minHeight: "45vh", minWidth: "62vw" }}
                    >
                        <div className='flex flex-col h-full items-center justify-center gap-[1vh]'>
                            {hoveringStart && 
                                <LockIcon color="black" size={"20vh"} className="animate-wiggle"/>
                            }
                            {!hoveringStart &&
                                <LockIcon color="black" size={"20vh"}/>
                            }
                            <div className='flex justify-between w-[50%] '>
                                <button 
                                    className='rounded-full text-white text-2xl font-bold  bg-green-500 px-4 py-2 w-[48%] min-w-[130px] h-[6vh]'
                                    onMouseEnter={() => setHoveringStart(true)}
                                    onMouseLeave={() => setHoveringStart(false)}
                                >
                                    Start
                                </button>
                                <button className="rounded-full text-white text-2xl font-bold bg-red-500 px-4 py-2 w-[48%] min-w-[130px] h-[6vh]">
                                    Quit
                                </button>
                            </div>
                            <h2 className='text-black text-lg font-extrabold'>Once you start, there is no turning back!</h2>
                        </div>
                    </div>
                }
                <div className="flex w-full justify-between py-3 items-center">
                    <h2>Time: {formatTime(totalTime)}</h2>
                    <ProgressBar progress={progress} height="5" className={"w-[85%]"}/>
                </div>
            </div>
        </div>
    );
};

export default ChallengeArea;