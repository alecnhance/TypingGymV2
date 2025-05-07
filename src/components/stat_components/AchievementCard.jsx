import ProgressBar from '../typing_area_comp/ProgressBar';

const AchievementCard = ({ progress, title, description, image }) => {
    return (
        <div className="flex items-center gap-2 h-[70px] flex-grow">
            <div className='h-[100%] aspect-square object-cover bg-mainBackground p-2 rounded-3xl'>
                <img src={image} className='w-full h-full object-contain invert'/>
            </div>
            <div className='flex flex-col h-full w-full text-left justify-between py-2'>
                <p className="text-lg text-white  truncate line-clamp-1">{title}</p>
                <p className="text-xs font-extralight text-white  truncate line-clamp-1">{description}</p>
                <ProgressBar progress={progress} height="2" className="w-full"/>
            </div>
        </div>
    );
};

export default AchievementCard;