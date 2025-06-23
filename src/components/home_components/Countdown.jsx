import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlipDigit = ({ digit }) => (
    <AnimatePresence mode="popLayout">
        <motion.div
            key={digit}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="p-1 bg-mainBackground font-mono"
        >
            {digit}
        </motion.div>
    </AnimatePresence>
);

const Countdown = () => {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [flipAnimation, setFlipAnimation] = useState(false);

    const getTimeUntilUTCMidnight = () => {
        const now = new Date();
        const tomorrow = new Date(now);
        
        tomorrow.setUTCHours(24, 0, 0, 0);
        
        const diff = (tomorrow - now) / 1000;
      
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = Math.floor(diff % 60);
      
        return { hours, minutes, seconds };
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(getTimeUntilUTCMidnight());
            // Trigger flip animation
            setFlipAnimation(true);
            setTimeout(() => setFlipAnimation(false), 150);
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    return (
        <div className='flex  text-[1em] sm:text-[1.3em] md:text-[1.7em] lg:text-[2em] font-mono justify-center '>
            <div className='flex flex-col items-center gap-1'>
                <div className='flex gap-1'>
                    <FlipDigit digit={Math.floor(time.hours / 10) % 10}/>
                    <FlipDigit digit={time.hours % 10} />
                </div>
                <p className='text-2xl'>Hours</p>
            </div>
            <p className='p-1 font-mono'>:</p>
            <div className='flex flex-col items-center gap-1'>
                <div className='flex gap-1'>
                    <FlipDigit digit={Math.floor(time.minutes / 10) % 10}/>
                    <FlipDigit digit={time.minutes % 10} />
                </div>
                <p className='text-2xl'>Min</p>
            </div>
            <p className='p-1 font-mono'>:</p>
            <div className='flex flex-col items-center gap-1'>
                <div className='flex gap-1'>
                    <FlipDigit digit={Math.floor(time.seconds / 10) % 10}/>
                    <FlipDigit digit={time.seconds % 10} />
                </div>
                <p className='text-2xl'>Sec</p>
            </div>
        </div>
    );
};

export default Countdown;