import React, { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';
import InnerTyping from './InnerTyping';
import ProgressBar from './ProgressBar';
import { set } from 'date-fns';
import custom from '../../assets/customize.svg';

const formatTime = (ms) => {
    const min = Math.floor(ms / 60000);
    const seconds = Math.floor(ms / 1000);
    const sec = seconds - (min * 60);
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

const TypingArea = ({ isFree }) => {
    const [selectedOption, setSelectedOption] = useState('Random');
    const [progress, setProgress] = useState(0);
    const innerTypingRef = useRef(null); 
    const [redCount, setRedCount] = useState(0);
    const [spaceMisses, setSpaceMisses] = useState(new Set());
    const [totalTime, setTotalTime] = useState(0);
    const [numTyped, setNumTyped] = useState(0);
    const [numWrong, setNumWrong] = useState(0);
    const [wordCount, setWordCount] = useState(10);
    const [inputText, setInputText] = useState('');
    const samplePrompt = "This is a sample prompt that I am testing out";
    const [prompt, setPrompt] = useState(samplePrompt);
    const [capitalization, setCapitals] = useState(false);
    const [punctuation, setPunctuation] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [specialCharacters, setSpecialCharacters] = useState(false);
    const [custom, setCustom] = useState(false);
    
    const options = [
        { value: 'Random', label: 'Random' },
        { value: 'Jumble', label: 'Jumble' },
        { value: 'AI', label: 'AI' }
    ];

    const letterSet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const numberSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const punctuationSet = ['!', '?', '.', ',', ':', ';', '(', ')', '[', ']', '{', '}', '"', "'", '-'];
    const specialCharacterSet = ['@', '#', '$', '%', '^', '&', '*', '~', '`', '_', '+', '='];

    const handleCustom = () => {
        setCapitals(false);
        setPunctuation(false);
        setNumbers(false);
        setSpecialCharacters(false);
        setCustom(true);
    }

    const jumbleSettings = [
        { label: 'Capitalization', function: setCapitals, value: capitalization, charSet: letterSet },
        { label: 'Punctuation', function: setPunctuation, value: punctuation, charSet: punctuationSet },
        { label: 'Numbers', function: setNumbers, value: numbers, charSet: numberSet },
        { label: 'Special Characters', function: setSpecialCharacters, value: specialCharacters, charSet: specialCharacterSet },
        { label: 'Custom', function: handleCustom, value: custom },
    ];
    
    const handleSelect = (value) => {
        setSelectedOption(value);
    };
    
    useEffect(() => {
        resetPrompt();
        setColorDict(initColorDict(prompt));
    }, [])
    
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

    const resetPrompt = () => {
        if (selectedOption === "Random") {
            makeRandomPrompt();
        }
    }

    const makeRandomPrompt = (count = wordCount) => {
        fetch('/words.txt')
            .then(res => res.text())
            .then(text => {
                const words = text.split('\n');
                let string = "";
                for (let i = 0; i < count; i++) {
                    const index = Math.floor(Math.random() * words.length);
                    string += words[index] + ' ';
                }
                setPrompt(string.slice(0, string.length - 1));
                setColorDict(initColorDict(string.slice(0, string.length - 1)));
            })
    }

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

    const handleNewPrompt = () => {
        resetPrompt();
        handleRestart();
    }

    const handleRandomButtons = (item) => {
        setWordCount(item);
        makeRandomPrompt(item);
        handleRestart();
    }

    const handleJumbleButtons = (item) => {
        if (custom === true) {
            if (item.label !== 'Custom') {
                setCustom(false);
            }
        }
        item.function(prev => !prev);
        // Make jumble prompt
        handleRestart();
    }


    return(
        <div className="flex flex-col w-full max-w-[95%] bg-headerGray rounded-3xl h-auto p-8">
            <h2 className="w-full mb-3 font-bold text-2xl">Typing Practice Session</h2>
            <div className="flex justify-between w-full mb-3 items-center ">
                <div className='flex justify-between items-center gap-4'>
                    {!isFree &&
                        <>
                            <Dropdown options={options} onSelect={handleSelect} />
                            <div className='flex gap-4'>
                                {[10, 25, 50, 100].map((item, index) => (
                                    <div key={index}>
                                        <button
                                            className={`${wordCount === item ? 'text-navOrange' : ''}`}
                                            onClick={() => handleRandomButtons(item)}
                                        >
                                            {item}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {selectedOption === 'Jumble' && 
                                <div className='flex gap-4'>
                                    {jumbleSettings.map((item, index) => (
                                        <button key={index} onClick={() => handleJumbleButtons(item)}
                                        className={`${item.value ? 'text-navOrange' : ''}`}>
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            }
                        </>
                    }
                </div>
                <h2>WPM: {getWPM()}</h2>
            </div>
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
                isDaily={false}
            />
            <div className="flex w-full justify-between py-3 items-center">
                <h2>Time: {formatTime(totalTime)}</h2>
                <ProgressBar progress={progress} height="5"/>
                <h2>Accuracy: {getAccuracy()}%</h2>
            </div>
            <div className="flex w-full items-center justify-center gap-4 mt-6">
                <button
                    className="rounded-full text-white bg-navOrange px-4 py-2 min-w-[130px]"
                    onClick={handleRestart}
                >
                    Restart
                </button>
                <button
                    className="rounded-full text-white bg-navOrange px-4 py-2 min-w-[130px]"
                    onClick={handleNewPrompt}
                >
                    New Prompt
                </button>
            </div>
        </div>
    );
};

export default TypingArea;