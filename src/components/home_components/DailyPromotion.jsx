import BenchPressWidget from './BenchPressWidget';
import Countdown from './Countdown';

const DailyPromotion = () => {
    return (
        <div className="flex flex-col w-full items-center justify-between gap-[4vh]" >
            <div className='w-[60%]'>
                <BenchPressWidget />
            </div>
            <div className='w-[90%] '>
                <Countdown />
            </div>
        </div>
        
    );
}

export default DailyPromotion;