import React, { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';
import InnerTyping from './InnerTyping';
import ProgressBar from './ProgressBar';
import { set } from 'date-fns';
import custom from '../../assets/customize.svg';
import Keyboard from '../stat_components/Keyboard';
import { interpolateColor } from '../../utils/colors';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

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
    const [showModal, setShowModal] = useState(false);
    const [shifted, setShifted] = useState(false);
    const [weightDropdown, setWeightDropdown] = useState(0);
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);
    const [showPromptModal, setPromptModal] = useState(false);
    const [aiText, setAiText] = useState('');
    
    const options = [
        { value: 'Random', label: 'Random' },
        { value: 'Jumble', label: 'Jumble' },
        { value: 'AI', label: 'AI' }
    ];
    
    const letterSet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const numberSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const punctuationSet = ['!', '?', '.', ',', ':', ';', '(', ')', '[', ']', '{', '}', '"', "'", '-'];
    const specialCharacterSet = ['@', '#', '$', '%', '^', '&', '*', '~', '`', '_', '+', '=', '|', '<', '>', '/', '\\'];
    const [charSetDropdown, setCharSetDropdown] = useState(letterSet);

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
        setLetters(false);
        setCharSetDropdown(letterSet);
        setWeightDropdown(0);
        setCustom(true);
        setShowModal(true);
    }

    const jumbleSettings = [
        { label: 'Capitalization', function: setCapitals, value: capitalization, charSet: [] },
        { label: 'Letters', function: setLetters, value: letters, charSet: letterSet },
        { label: 'Punctuation', function: setPunctuation, value: punctuation, charSet: punctuationSet },
        { label: 'Numbers', function: setNumbers, value: numbers, charSet: numberSet },
        { label: 'Special', function: setSpecialCharacters, value: specialCharacters, charSet: specialCharacterSet },
        { label: 'Custom', function: handleCustom, value: custom },
    ];
    
    const keyboardLayout = [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
        ['Space']
    ];
    
    const keyboardLayoutShifted = [
        ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
        ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|'],
        ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
        ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Shift'],
        ['Space']
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
                updatedCharSet = [];
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

    const getWeight = (key) => {
        if (!currentCharSet || !Array.isArray(currentCharSet)) {
            return 0;
        }
        const charItem = currentCharSet.find(item => item.letter === key);
        return charItem ? charItem.weight : 0;
    }

    const getKeyColor = (key) => {
        // Special keys always return base color
        if (key === 'Space' || key === 'Tab' || key === 'CapsLock' || key === 'Shift' || key === 'Backspace' || key === 'Enter') {
            return '#161616';
        }
        
        // Find the character in currentCharSet
        const weight = getWeight(key);
        
        // Clamp weight between 0 and 100
        const clampedWeight = Math.max(0, Math.min(100, weight));
        
        // Convert weight (0-100) to factor (0-1)
        const factor = clampedWeight / 100;
        
        // Interpolate between base color (#161616) and navOrange (#F5972F)
        return interpolateColor('#161616', '#F5972F', factor);
    }

    const setWeight = (charSet, weight) => {
        console.log(charSet);
        console.log(currentCharSet);
        const fastCharSet = new Set(charSet);
        const newArr = currentCharSet.filter(item => !fastCharSet.has(item.letter));
        for (let char of charSet) {
            newArr.push({letter: char, weight: weight});
        }
        console.log(newArr);
        setCurrentCharSet(newArr);
    }

    const handleCloseModal = (isKeyModal, isPromptModal = false) => {
        if (isKeyModal) {
            setShowModal(true);
            setShowKeyModal(false);
        } else if (isPromptModal) {
            setPromptModal(false);
            resetPrompt(wordCount);
        } else {
            setShowModal(false);
            resetPrompt(wordCount);
            handleRestart();
        }
    }

    const handleKeyClick = (key) => {
        if (key === 'Space' || key === 'Tab' || key === 'CapsLock' || key === 'Shift' || key === 'Backspace' || key === 'Enter') {
            return;
        }
        setSelectedKey(key);
        setShowKeyModal(true);
        setShowModal(true);
    }

    const changeWeight = (key, amount) => {
        const normalizedKey = key.toLowerCase();
        setCurrentCharSet(prev => {
            const charIndex = prev.findIndex(item => item.letter === normalizedKey);
            
            if (charIndex === -1) {
                // Character doesn't exist, add it with the new weight
                const newWeight = Math.max(0, Math.min(100, amount));
                return [...prev, { letter: normalizedKey, weight: newWeight }];
            }
            
            // Character exists, update its weight
            const currentWeight = prev[charIndex].weight;
            const newWeight = Math.max(0, Math.min(100, currentWeight + amount));
            
            // Create new array with updated character
            const updated = [...prev];
            updated[charIndex] = { ...updated[charIndex], weight: newWeight };
            setCurrentCharSet(updated);
        });
    }

    return(
        <>
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
                                {selectedOption === 'AI' && (
                                    <button onClick={() => setPromptModal(true)}>
                                        Prompt
                                    </button>
                                )}
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
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className='bg-headerGray w-[60vw] rounded-3xl p-4'>
                        <div className='flex justify-end'>
                            <button onClick={() => handleCloseModal(false)} className='font-bold text-2xl'>
                                X
                            </button>
                        </div>
                        <h1 className='text-4xl'>Customize</h1>
                        <div className='flex w-full justify-between px-11'>
                            <h2 className='text-2xl'>Character Weight</h2>
                            <button 
                                className='border border-white rounded-md px-3' 
                                onClick={() => setShifted(prev => !prev)}
                            >
                                Shift
                            </button>
                        </div>
                        <div className="w-full inline-block px-10 mt-2">
                            {(shifted ? keyboardLayoutShifted : keyboardLayout).map((row, i) => (
                                <div key={i} className="flex justify-center w-full p-1 gap-1">
                                    {row.map((key, j) => (
                                        <div
                                            key={j}
                                            className={`text-lg text-center text-white px-2 py-2 rounded flex-grow`}
                                            style={{
                                                flexBasis: key === 'Space' ? '45%' : 'auto',
                                                backgroundColor: `${getKeyColor(key.toLowerCase())}`
                                            }}
                                            onClick={() => handleKeyClick(key)}
                                        >
                                            {key}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-between px-11 mt-5'>
                            <div className='flex'>
                                <Dropdown options={[{label: "Clear", value: 0}, {label: "Set Middle", value: 50}, {label: "Max Out", value: 100}]} onSelect={setWeightDropdown} />
                                <Dropdown options={[{label: "Letters", value: letterSet}, {label: "Punctuation", value: punctuationSet}, {label: "Numbers", value: numberSet}, {label: "Special", value: specialCharacterSet}, {label: "All", value: letterSet.concat(punctuationSet).concat(numberSet).concat(specialCharacterSet)}]} onSelect={setCharSetDropdown} />
                            </div>
                            <button
                                onClick={() => setWeight(charSetDropdown, weightDropdown)}
                                className='rounded-full bg-navOrange text-white px-3'
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showKeyModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className='bg-headerGray  rounded-3xl p-4 w-[25vw] flex flex-col items-center'>
                        <div className='flex justify-end  w-full '>
                            <button onClick={() => handleCloseModal(true)} className='font-bold text-2xl'>
                                X
                            </button>
                        </div>
                        <div
                            className={`text-6xl text-white rounded-xl border-black border-2 w-[8vw] h-[8vw] flex justify-center items-center`}
                            style={{
                                backgroundColor: `${getKeyColor(selectedKey.toLowerCase())}`,
                            }}
                        >
                            {/[a-z]/.test(selectedKey) ? (
                                <span className='leading-none inline-block' style={{ transform: 'translateY(-0.1em)' }}>
                                    {selectedKey}
                                </span>
                            ) : (
                                selectedKey
                            )}
                        </div>
                        <div className='flex items-center gap-1 mt-2'>
                            <button className='text-2xl'onClick={() => changeWeight(selectedKey, -100)}>
                                Min
                            </button>
                            <ChevronLeft className='w-10 h-10' onClick={() => changeWeight(selectedKey, -10)}/>
                            <ChevronLeft className='w-5 h-5' onClick={() => changeWeight(selectedKey, -1)}/>
                            <h2 className='text-2xl'>{getWeight(selectedKey)}</h2>
                            <ChevronRight className='w-4 h-4' onClick={() => changeWeight(selectedKey, 1)}/>
                            <ChevronRight className='w-12 h-12' onClick={() => changeWeight(selectedKey, 10)}/>
                            <button className='text-2xl'onClick={() => changeWeight(selectedKey, 100)}>
                                Max
                            </button>
                            
                        </div>
                        <h2 className='text-2xl italic font-light'>Weight</h2>
                    </div>
                </div>
           
            )};
            { showPromptModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className='bg-headerGray  rounded-3xl p-4 w-[50vw] flex flex-col items-center'>
                        <div className='flex justify-end  w-full '>
                            <button onClick={() => handleCloseModal(false, true)} className='font-bold text-2xl'>
                                X
                            </button>
                        </div>
                        <h2 className='text-4xl'>AI Prompt Generator</h2>
                        <textarea 
                            value={aiText} 
                            onChange={(e) => setAiText(e.target.value)} 
                            placeholder='e.g., "a paragraph about artificial intelligence and machine learning"' 
                            className='w-full p-2 rounded-md mt-4 bg-white text-black' 
                            rows={3} 
                        />
                        <button className='rounded-full bg-navOrange text-white px-3 py-1 mt-4'>
                            Generate
                        </button>
                    </div>
                </div>
            )};
        </>
    );
};

export default TypingArea;