import { useDailyLeaders } from '../../hooks/useDailyLeaders';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';

const CommunityGraph = () => {
    const { loading, fastestTyper, fastestChallenge, mostPrompts } = useDailyLeaders();
    const [currentDisplay, setCurrentDisplay] = useState(0); // 0: fastestTyper, 1: fastestChallenge, 2: mostPrompts

    // Rotate between the three displays every 4 seconds
    useEffect(() => {
        if (loading) return;
        
        const interval = setInterval(() => {
            setCurrentDisplay((prev) => (prev + 1) % 3);
        }, 4000);

        return () => clearInterval(interval);
    }, [loading]);

    if (loading) {
        return (
            <div className="flex flex-col w-full h-full items-center justify-center gap-[5%]">
                <CircularProgress color='white'/>
            </div>
        );
    }

    // Determine which data to display
    let title, value, user;
    if (currentDisplay === 0) {
        // Fastest Typer
        title = "Fastest Typer Today";
        value = `${Math.round(fastestTyper.wpm)} WPM`;
        user = fastestTyper;
    } else if (currentDisplay === 1) {
        // Fastest Challenger
        title = "Fastest Challenger Today";
        value = `${Math.round(fastestChallenge.wpm)} WPM`;
        user = fastestChallenge;
    } else {
        // Most Prompts
        title = "Most Prompts Today";
        value = `${mostPrompts.count} Prompts`;
        user = mostPrompts;
    }

    return (
        <div className="flex flex-col w-full h-full items-center justify-center gap-[5%]">
            <h2>{title}</h2>
            <h1>{value}</h1>
            <div className="flex  h-[15%] items-center gap-[1vw]">
                <img src={user.pic_url} className=" h-full aspect-square rounded-full object-cover"/>
                <h2>{user.username}</h2>
            </div>
        </div>
    );
};

export default CommunityGraph;