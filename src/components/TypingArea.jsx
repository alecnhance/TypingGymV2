import React, { useState } from 'react';

const TypingArea = () => {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    return (
        <div className="typing-area w-3/5">
            <textarea
                value={inputText}
                onChange={handleInputChange}
                placeholder="Start typing here..."
                rows="10"
                className="w-full"
            />
            <p>Characters typed: {inputText.length}</p>
        </div>
    );
};

export default TypingArea;