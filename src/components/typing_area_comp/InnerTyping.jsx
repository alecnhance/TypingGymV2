import React, { useState, useRef } from 'react';

const InnerTyping = () => {
    const [inputText, setInputText] = useState('');
    const samplePrompt = "This is a sample prompt that I am testing out"
    const samplePromptSplit = samplePrompt.split("");
    const initColorDict = () => {
        return samplePromptSplit.map((_, index) => index).reduce((acc, val) => {
            acc[val] = "text-headerGray";
            return acc;
        }, {});
    }
    const [colorDict, setColorDict] = useState(initColorDict);
    const inputRef = useRef(null);
    
    const handleInputChange = (event) => {
        const len = event.target.value.length;
        if (len > inputText.length) {
            const newChar = event.target.value[len - 1];
            if (samplePrompt[len - 1] === newChar) {
                setColorDict(prev => ({
                    ...prev,
                    [len - 1]: prev[len - 1] === 'text-headerGray' || prev[len - 1] === 'text-green-500'
                        ? 'text-green-500'
                        : 'text-yellow-500'
                }));
            } else {
                setColorDict(prev => ({
                    ...prev,
                    [len - 1]: 'text-red-500'
                }));
            }
        }
        setInputText(event.target.value);
    };

    const handleKeyDown = (event) => {

    }

    return (
        <div className="flex flex-wrap bg-white rounded-3xl items-start py-4 px-4 min-h-[100px]">
            <input
                type='text'
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                className='absolute opacity-0 w-0 h-0'
                autoFocus
            />
            {samplePrompt.split(/(\s+)/).map((word, wordIndex) => (
                <span key={wordIndex} className='whitespace-pre'>
                    {word.split("").map((char, charIndex) => {
                        const index = samplePrompt.split(/(\s+)/).slice(0, wordIndex).join("").length + charIndex;
                        const isCursor = index === inputText.length;
                        const color = index >= inputText.length ? 'text-headerGray' : colorDict[index];
                        return (
                            <span key={charIndex} className={`${color} relative`}>
                                {char}
                                {isCursor && (
                                    <span className='absolute left-0 top-0 h-full w-0.5 bg-headerGray animate-blink'/>
                                )}
                            </span>
                        );
                    })}
                </span>
            ))}
        </div>
    );
};

export default InnerTyping;