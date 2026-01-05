import React, { useState, useRef, useEffect } from 'react';
import InnerTyping from './InnerTyping';
import ProgressBar from './ProgressBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

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
    const navigate = useNavigate();
    const { getToken } = useAuth();

    useEffect(() => {
        // Fetch the daily prompt
        const fetchDailyPrompt = async () => {
            try {
                const API_BASE_URL = import.meta.env.VITE_API_URL || '';
                const response = await fetch(`${API_BASE_URL}/api/daily/prompt`);
                if (!response.ok) {
                    throw new Error('Failed to fetch daily prompt');
                }
                const data = await response.json();
                setPrompt(data.prompt);
                setColorDict(initColorDict(data.prompt));
                setLoadingPrompt(false);
            } catch (error) {
                console.error('Error fetching daily prompt:', error);
                // Fallback to default prompt
                const defaultPrompt = "The quick brown fox jumps over the lazy dog. Practice makes perfect!";
                setPrompt(defaultPrompt);
                setColorDict(initColorDict(defaultPrompt));
                setLoadingPrompt(false);
            }
        };
        fetchDailyPrompt();
    }, [])

    const [inputText, setInputText] = useState('');
    const [prompt, setPrompt] = useState("Loading daily challenge...");
    const [loadingPrompt, setLoadingPrompt] = useState(true);
    const initColorDict = (curr) => {
        const samplePromptSplit = curr.split("");
        return samplePromptSplit.map((_, index) => index).reduce((acc, val) => {
            acc[val] = "text-headerGray";
            return acc;
        }, {});
    }
    const [colorDict, setColorDict] = useState(initColorDict(prompt));

    const handleRestart = () => {
        setInputText("");
        setColorDict(initColorDict(prompt));
        setRedCount(0);
        setProgress(0);
        setTotalTime(0);
        setNumTyped(0);
        setNumWrong(0);
        innerTypingRef.current?.focus();
        innerTypingRef.current?.resetTimer();
    }

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
    const startChallenge = async () => {
        handleRestart();
        setStarted(true);
        const startISO = new Date(Date.now()).toISOString();
        const endISO = new Date(Date.now()).toISOString();
        const object = {
            numChars: 0,
            keyStrokes: 0,
            keyDict: {},
            start: startISO,
            end: endISO,
            acc: 0,
            wpm: 0,
            isDaily: true
        };
        try {
            const token = await getToken();
            const API_BASE_URL = import.meta.env.VITE_API_URL || '';
            const res = await fetch(`${API_BASE_URL}/api/users/me`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(object)
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server responded with ${res.status}: ${errorText}`);
            }

            //keyAccuracyRef.current = {};
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    }


    return(
        <div className='relative'>
            <div className="absolute -inset-1 bg-navOrange rounded-3xl blur opacity-75 animate-pulse"></div>
            <div className="relative flex flex-col w-full bg-headerGray rounded-3xl h-auto p-8">
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
                        isDaily={true}
                    />
                }
                {!started && 
                    <div
                        className={`bg-mainBackground rounded-3xl py-8 px-4 w-full border border-gray-700/50`}
                        style={{ minHeight: "45vh", minWidth: "62vw" }}
                    >
                        <div className='flex flex-col h-full items-center justify-center gap-8'>
                            <div className='relative'>
                                {hoveringStart && 
                                    <div className="absolute inset-0 bg-navOrange/20 rounded-full blur-2xl animate-pulse"></div>
                                }
                                {hoveringStart && 
                                    <LockIcon color="#F5972F" size={"20vh"} className="relative animate-wiggle drop-shadow-lg"/>
                                }
                                {!hoveringStart &&
                                    <LockIcon color="#2D2D2D" size={"20vh"} className="drop-shadow-md transition-all duration-300"/>
                                }
                            </div>
                            <div className='flex justify-center items-center gap-4 w-full max-w-md'>
                                <button 
                                    className='flex items-center justify-center rounded-full text-white text-xl font-bold bg-navOrange px-6 py-3 w-[45%] min-w-[130px] h-[5vh] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 hover:bg-orange-500'
                                    onMouseEnter={() => setHoveringStart(true)}
                                    onMouseLeave={() => setHoveringStart(false)}
                                    onClick={startChallenge}
                                >
                                    Start
                                </button>
                                <button 
                                    className="flex items-center justify-center rounded-full text-white text-xl font-bold bg-gray-600 px-6 py-3 w-[45%] min-w-[130px] h-[5vh] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-500"
                                    onClick={() => navigate("/home")}
                                >
                                    Quit
                                </button>
                            </div>
                            <div className='flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30'>
                                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <h2 className='text-orange-400 text-base font-semibold'>Once you start, there is no turning back!</h2>
                            </div>
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