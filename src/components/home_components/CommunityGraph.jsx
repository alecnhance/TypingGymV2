import { useDailyLeaders } from '../../hooks/useDailyLeaders';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className="flex flex-col w-full h-full items-center justify-center gap-[5%] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentDisplay}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="flex flex-col w-full h-full items-center justify-center gap-[5%]"
                >
                    <h2>{title}</h2>
                    <h1>{value}</h1>
                    <div className="flex h-[15%] items-center gap-[1vw]">
                        <motion.img 
                            src={user.pic_url} 
                            className="h-full aspect-square rounded-full object-cover"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                        />
                        <h2>{user.username}</h2>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default CommunityGraph;