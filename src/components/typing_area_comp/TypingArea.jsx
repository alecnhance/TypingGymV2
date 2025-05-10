import React, { useState, useRef } from 'react';
import Dropdown from './Dropdown';
import InnerTyping from './InnerTyping';
import ProgressBar from './ProgressBar';
import { space } from 'postcss/lib/list';

const TypingArea = () => {
    const [selectedOption, setSelectedOption] = useState(' ');
    const [progress, setProgress] = useState(50);
    const innerTypingRef = useRef(null); 
    const [redCount, setRedCount] = useState(0);
    const [spaceMisses, setSpaceMisses] = useState(new Set());
    const [totalTime, setTotalTime] = useState(0);


    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
    ];

    const handleSelect = (value) => {
        setSelectedOption(value);
    };

    const [inputText, setInputText] = useState('');
    const samplePrompt = "This is a sample prompt that I am testing out";
    const [prompt, setPrompt] = useState(samplePrompt);
    const samplePromptSplit = samplePrompt.split("");
    const initColorDict = () => {
        return samplePromptSplit.map((_, index) => index).reduce((acc, val) => {
            acc[val] = "text-headerGray";
            return acc;
        }, {});
    }
    const [colorDict, setColorDict] = useState(initColorDict());

    const handleRestart = () => {
        setInputText("");
        setColorDict(initColorDict());
        setRedCount(0);
        innerTypingRef.current?.focus();
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

    return(
        <div className="flex flex-col w-full max-w-[95%] bg-headerGray rounded-3xl h-auto p-8">
            <h2 className="w-full mb-3 font-bold text-2xl">Typing Practice Session</h2>
            <div className="flex justify-between w-full mb-3 items-center">
                <Dropdown options={options} onSelect={handleSelect} />
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
                totalTime={totalTime}
                setTotalTime={setTotalTime}
            />
            <div className="flex w-full justify-between py-3 items-center">
                <h2>Time: 00:00</h2>
                <ProgressBar progress={progress} height="5"/>
                <h2>Accuracy: 100%</h2>
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
                >
                    New Prompt
                </button>
            </div>
        </div>
    );
};

export default TypingArea;