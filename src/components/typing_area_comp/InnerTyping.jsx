import React, { useState } from 'react';

const InnerTyping = () => {
    const [inputText, setInputText] = useState('');

    const samplePrompt = "This is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing outThis is a sample prompt that I am testing out";

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    return(
        <div className="flex flex-col bg-white rounded-3xl items-start py-4 min-h-[100px] px-6">
            <p className="text-black text-lg text-left">{samplePrompt}</p>
        </div>
    );
};

export default InnerTyping;