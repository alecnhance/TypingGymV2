import BenchPressWidget from './BenchPressWidget';
import Countdown from './Countdown';
import medal from '../../assets/medal.svg';
import lightning from '../../assets/lightning.svg';
import { useDailyStatus } from '../../hooks/useDailyStatus';

const DailyStreak = () => {
    const { completed, loading, dates } = useDailyStatus();
    const getStreak = () => {
        let current = new Date();
        let streak = 0;
        if (dates.has(current.toDateString())) {
            streak++;
        }
        current.setDate(current.getDate() - 1);
        while (dates.has(current.toDateString())) {
            streak++;
            current.setDate(current.getDate() - 1);
        }
        return streak;
    };
    return (
        <div className='hidden lg:block relative w-[6vh]'>
            <img src={medal} className='invert'/>
            <div className='absolute inset-0 flex items-center justify-center text-navOrange text-[1.7em] font-bold translate-y-[1.3vh]'>
                {getStreak()}
            </div>
        </div>
    );
};

const DailyPromotion = () => {
    return (
        <div className="flex flex-col w-full items-center justify-center gap-[4vh]" >
            <div className='w-[100%] md:w-[80%] sm:w-[90%] lg:w-[60%]'>
                <BenchPressWidget />
            </div>
            <div className='w-[85%] items-center justify-center'>
                <div className='flex w-full items-center justify-center lg:justify-between'>
                    <DailyStreak />
                    <Countdown />
                    <DailyStreak />
                </div>
            </div>
        </div>
        
    );
}

export default DailyPromotion;