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
        <div className={`${className} px-[2vw] py-[2vh] h-full overflow-auto`}>
            <h2 className="mb-2 text-3xl">Achievements</h2>
            {achievementData.map((item, i) => (
                <div key={i} className="mt-2">
                    {item.progress >= 100 ? (
                        <CompletionCard title={item.title} icon={item.icon} description={item.description}/>
                    ) : (
                        <AchievementCard progress={item.progress} title={item.title} description={item.description} icon={item.icon}/>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Achievements;