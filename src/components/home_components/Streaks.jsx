import flame from '../../assets/flame.svg';
import { usePracticeDates } from '../../hooks/usePracticeDates';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedFlame from '../home_components/AnimatedFlame';

const Streaks = () => {
    const { dates, loading } = usePracticeDates();
    const navigate = useNavigate();
    const getStreak = () => {
        const set = new Set(dates.map(date => date.toDateString()));
        let current = new Date();
        let streak = 0;
        if (set.has(current.toDateString())) {
            streak++;
        }
        current.setDate(current.getDate() - 1);
        while (set.has(current.toDateString())) {
            streak++;
            current.setDate(current.getDate() - 1);
        }
        return streak;
    };
    const handleNavigate = () => {
        navigate('/practice');
    };
    return (
        <div className='flex justify-center items-center w-full bg-headerGray flex-1 rounded-2xl gap-2'>
            {getStreak() !== 0 && (
                <div className='flex justify-center items-center w-full bg-headerGray flex-1 rounded-2xl gap-2'>
                    <h1 className="text-3xl">{`${getStreak()} Day Streak`}</h1>
                    <AnimatedFlame />
                </div>
            )}
            {getStreak() === 0 && (
                <div 
                    className='flex justify-center items-center h-full w-full bg-headerGray flex-1 rounded-2xl gap-2 cursor-pointer'
                    onClick={handleNavigate}
                >
                    <h1 className="text-3xl">{`Start your streak!`}</h1>
                    <ArrowRight className='text-navOrange'/>
                </div>
            )}
        </div>
    );
};

export default Streaks;