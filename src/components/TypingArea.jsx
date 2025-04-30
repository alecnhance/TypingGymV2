import React, { useState } from 'react';
import Dropdown from './Dropdown';
import InnerTyping from './InnerTyping';
import ProgressBar from './ProgressBar';

const TypingArea = () => {
    const [selectedOption, setSelectedOption] = useState(' ');
    const [progress, setProgress] = useState(50);

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' }
    ];

    const handleSelect = (value) => {
        setSelectedOption(value);
    };

    return(
        <div className="flex flex-col w-full max-w-[95%] bg-headerGray rounded-3xl h-auto p-8">
            <h2 className="w-full mb-3 font-bold text-2xl">Typing Practice Session</h2>
            <div className="flex justify-between w-full mb-3 items-center">
                <Dropdown options={options} onSelect={handleSelect} />
                <h2>WPM: 100</h2>
            </div>
            <InnerTyping />
            <div className="flex w-full justify-between py-3 items-center">
                <h2>Time: 00:00</h2>
                <ProgressBar progress={progress}/>
                <h2>Accuracy: 100%</h2>
            </div>
            <div className="flex w-full items-center justify-center gap-4 mt-6">
                <button
                    className="rounded-full text-white bg-navOrange px-4 py-2 min-w-[130px]"
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