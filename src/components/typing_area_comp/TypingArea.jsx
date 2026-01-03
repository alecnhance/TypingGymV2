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
    const [letters, setLetters] = useState([]);
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
    
    const initCharSet = () => {
        let charSet = [];
        for (let letter of letterSet) {
            charSet.push({
                letter: letter,
                weight: 50,
            });
        }
        return charSet;
    }
    const [currentCharSet, setCurrentCharSet] = useState(initCharSet());

    const handleCustom = () => {
        setCapitals(false);
        setPunctuation(false);
        setNumbers(false);
        setSpecialCharacters(false);
        setCustom(true);
    }

    const jumbleSettings = [
        { label: 'Capitalization', function: setCapitals, value: capitalization, charSet: [] },
        { label: 'Letters', function: setLetters, value: letters, charSet: letterSet },
        { label: 'Punctuation', function: setPunctuation, value: punctuation, charSet: punctuationSet },
        { label: 'Numbers', function: setNumbers, value: numbers, charSet: numberSet },
        { label: 'Special', function: setSpecialCharacters, value: specialCharacters, charSet: specialCharacterSet },
        { label: 'Custom', function: handleCustom, value: custom },
    ];
    
    const handleSelect = (value) => {
        setSelectedOption(value);
        if (value === "Jumble") {
            makeJumblePrompt(wordCount, currentCharSet);
        } else {
            makeRandomPrompt(wordCount);
        }
        handleRestart();
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

    const resetPrompt = (wordCount) => {
        if (selectedOption === "Random") {
            makeRandomPrompt(wordCount);
        } else if (selectedOption === "Jumble") {
            makeJumblePrompt(wordCount);
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
        resetPrompt(wordCount);
        handleRestart();
    }

    const handleRandomButtons = (item) => {
        setWordCount(item);
        resetPrompt(item);
        handleRestart();
    }

    const makeJumblePrompt = (wordCount, charSet = currentCharSet, cap = capitalization) => {
        let string = "";
        const spaceProbability = 0.2;
        let sumWeights = charSet.reduce((acc, item) => acc + item.weight, 0);
        let cumWords = 0;
        let currentWordLength = 0;
        while (cumWords < wordCount) {
            if (currentWordLength < 4) {
                const selectedChar = selectRandomChar(sumWeights, charSet);
                string += currentWordLength === 0 && cap ? selectedChar.toUpperCase() : selectedChar;
                currentWordLength++;
            } else {
                if (Math.random() < spaceProbability) {
                    cumWords++
                    currentWordLength = 0;
                    if (cumWords < wordCount) {
                        string += " ";
                    }
                } else {
                    string += selectRandomChar(sumWeights, charSet);
                    currentWordLength++;
                }
            }
        }
        setPrompt(string);
        setColorDict(initColorDict(string));
        return string;
    }

    const selectRandomChar = (sumWeights, charSet) => {
        const random = Math.random() * sumWeights;
        let cumWeight = 0;
        for (let i = 0; i < charSet.length; i++) {
            cumWeight += charSet[i].weight;
            if (cumWeight >= random) {
                return charSet[i].letter;
            }
        }
        return charSet[charSet.length - 1].letter;
    }

    const handleJumbleButtons = (item) => {
        let updatedCharSet = currentCharSet;
        
        if (item.label === 'Custom') {
            // Handle custom case
        } else {
            const enabledCount = [letters, punctuation, numbers, specialCharacters].filter(Boolean).length;
            if (enabledCount === 1 && item.value === true) {
                return;
            }
            if (custom === true) {
                setCustom(false);
            }
            
            // Calculate the updated charSet synchronously
            if (item.value === false) {
                // Add characters
                const existingLetters = new Set(updatedCharSet.map(charItem => charItem.letter));
                const newChars = item.charSet
                    .filter(char => !existingLetters.has(char))
                    .map(char => ({
                        letter: char,
                        weight: 50
                    }));
                updatedCharSet = [...updatedCharSet, ...newChars];
            } else {
                // Remove characters
                const charsToRemove = new Set(item.charSet);
                updatedCharSet = updatedCharSet.filter(charItem => !charsToRemove.has(charItem.letter));
            }
            
            // Update state for next time
            setCurrentCharSet(updatedCharSet);
        }
        
        item.function(prev => !prev);
        
        // Use the updated charSet immediately to generate prompt
        if (selectedOption === "Jumble") {
            if (item.label === 'Capitalization') {
                makeJumblePrompt(wordCount, updatedCharSet, !capitalization);
            } else {
            makeJumblePrompt(wordCount, updatedCharSet);
            }
        }
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
                                <div className='flex flex-wrap gap-4'>
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