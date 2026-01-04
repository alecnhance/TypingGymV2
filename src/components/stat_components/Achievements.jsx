import AchievementCard from "./AchievementCard";
import CompletionCard from "./CompletionCard";
import { useAchievements } from '../../hooks/useAchievements';
import { getAchievementData } from '../../utils/achievements';

const Achievements = ({ className }) => {
    const { loading, achievements } = useAchievements();
    const achievementData = getAchievementData(achievements);
    
    if (loading) {
        return (
            <div className={`${className} px-[2vw] py-[2vh] h-full overflow-auto`}>
                <h2 className="mb-2 text-3xl">Achievements</h2>
                <div>Loading...</div>
            </div>
        );
    }
    
    return (
        <div className={`${className} px-[2vw] py-[2vh] h-full overflow-auto shadow-lg shadow-white/20 hover:shadow-orange-500/20 hover:scale-[1.02] duration-500`}>
            <div className='flex items-center gap-2 mb-4 pb-3 border-b border-gray-700/50'>
                <div className='w-1 h-8 bg-navOrange rounded-full'></div>
                <h2 className="text-2xl font-bold text-white">Achievements</h2>
            </div>
            <div className='flex flex-col gap-3'>
                {achievementData.map((item, i) => (
                    <div key={i}>
                        {item.progress >= 100 ? (
                            <CompletionCard title={item.title} icon={item.icon} description={item.description}/>
                        ) : (
                            <AchievementCard progress={item.progress} title={item.title} description={item.description} icon={item.icon}/>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;