import bulb from '../../assets/bright-light-bulb.svg';
import { useState, useEffect } from 'react';

const TipWidget = () => {
    const [currentTip, setCurrentTip] = useState(0);
    const tips = [
        "Keep your fingers on the home row keys (ASDF and JKL;)",
        "Use the bumps on F and J keys to position your index fingers",
        "Maintain good posture: sit up straight with feet flat on the floor",
        "Focus on accuracy first, speed will come with practice",
        "Keep your wrists straight and avoid resting them on the desk",
        "Practice regularly - even 10 minutes daily makes a difference",
        "Don't look at the keyboard - use muscle memory instead",
        "Take breaks to prevent strain and maintain focus",
        "Use all ten fingers - each finger has its designated keys",
        "Start slow and gradually increase your typing speed",
        "Practice typing common words and phrases",
        "Keep your eyes on the screen, not your hands",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip((prev) => (prev + 1) % tips.length);
        },8000);

        return () => clearInterval(interval)
    }, []);

    return (
        <div className='flex items-center gap-2'>
            <img src={bulb} className='w-[15%]' />
            <h2 className="text-xl ">{tips[currentTip]}</h2>
        </div>
    );
};

export default TipWidget;