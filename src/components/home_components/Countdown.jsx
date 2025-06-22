import { useState, useEffect } from 'react';

const Countdown = () => {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

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
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className='flex  text-5xl font-mono justify-center'>
            <div className='flex flex-col items-center gap-1'>
                <div className='flex gap-1'>
                    <p className='bg-mainBackground   p-1'>{Math.floor(time.hours / 10) % 10}</p>
                    <p className='p-1 bg-mainBackground '>{time.hours % 10}</p>
                </div>
                <p className='text-2xl'>Hours</p>
            </div>
            <p className='p-1 font-mono'>:</p>
            <div className='flex flex-col items-center gap-1'>
                <div className='flex gap-1'>
                    <p className='p-1 bg-mainBackground '>{Math.floor(time.minutes / 10) % 10}</p>
                    <p className='p-1 bg-mainBackground '>{time.minutes % 10}</p>
                </div>
                <p className='text-2xl'>Min</p>
            </div>
            <p className='p-1 font-mono'>:</p>
            <div className='flex flex-col items-center gap-1'>
                <div className='flex gap-1'>
                    <p className='p-1 bg-mainBackground'>{Math.floor(time.seconds / 10) % 10}</p>
                    <p className='p-1 bg-mainBackground '>{time.seconds % 10}</p>
                </div>
                <p className='text-2xl'>Sec</p>
            </div>
        </div>
    );
};

export default Countdown;