import { space } from 'postcss/lib/list';
import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';

const InnerTyping = React.forwardRef(
    (
      {
        inputText,
        onInputChange,
        colorDict,
        onColorChange,
        prompt,
        setPrompt,
        redCount,
        setRedCount,
        spaceMisses,
        setSpaceMisses,
        setTotalTime,
        setProgress,
        setNumTyped,
        setNumWrong
      },
      ref
    ) => {
    
    const inputRef = useRef(null);
    const intervalRef = useRef(null);
    const startRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
        resetTimer: () => {
            clearInterval(intervalRef.current);
            startRef.current = null;
        }
    }));

    const updateSet = (old, index) => {
        const newSet = new Set();
        for (const num of old) {
            if (num === index) {
                continue;
            }
            newSet.add(num > index ? num - 1 : num);
        }
        return newSet;
    }

    const startTimer = () => {
        startRef.current = Date.now();
        intervalRef.current = setInterval(() => {
            setTotalTime(Date.now() - startRef.current);
        }, 1000)
    }

    const endTimer = () => {
        clearInterval(intervalRef.current);
        setTotalTime(Date.now() - startRef.current);
        startRef.current = null;
    }
 
    const handleInputChange = (event) => {
        const len = event.target.value.length;
        if (inputText.length === 0 && len > 0 && startRef.current === null) {
            startTimer();
        }
        if (len > inputText.length) {
            setNumTyped(prev => prev + 1);
            const newChar = event.target.value[len - 1];
            if (inputText.length === prompt.length && len >= inputText.length) {
                return;
            }
            if (prompt[len - 1] === newChar) {
                if (len === prompt.length && redCount === 0) {
                    endTimer();
                }
                if (colorDict[len - 1] === 'text-red-500') {
                    setRedCount(prev => prev - 1);
                }
                onColorChange(prev => ({
                    ...prev,
                    [len - 1]: prev[len - 1] === 'text-headerGray' || prev[len - 1] === 'text-green-500'
                        ? 'text-green-500'
                        : 'text-yellow-500'
                }));
                if (redCount === 0) {
                    setProgress(Math.floor(len / prompt.length * 100));
                }
            } else {
                setNumWrong(prev => prev + 1);
                if (prompt[len - 1] === ' ') {
                    setPrompt(prev => `${prev.slice(0, len - 1)}${newChar}${prev.slice(len - 1)}`);
                    setSpaceMisses(prev => {
                        const newSet = new Set(prev);
                        newSet.add(len - 1);
                        return newSet;
                    })
                    console.log(spaceMisses);
                }
                if (colorDict[len - 1] !== 'text-red-500') {
                    setRedCount(prev => prev + 1);
                }
                onColorChange(prev => ({
                    ...prev,
                    [len - 1]: 'text-red-500'
                }));
            }
        }
        onInputChange(event.target.value);
        
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Backspace') {
            console.log(spaceMisses);
            if (inputText.length === prompt.length && redCount === 0) {
                event.preventDefault();
                return;
            }
            const index = inputText.length - 1;
            if (spaceMisses.has(index)) {
                setPrompt(prev => `${prev.slice(0, index)}${prev.slice(index + 1)}`);
                setSpaceMisses(updateSet(spaceMisses, index));
            }
        }
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
            {prompt.split(/(\s+)/).map((word, wordIndex) => (
                <span key={wordIndex} className='whitespace-pre text-xl'>
                    {word.split("").map((char, charIndex) => {
                        const index = prompt.split(/(\s+)/).slice(0, wordIndex).join("").length + charIndex;
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
});

export default InnerTyping;