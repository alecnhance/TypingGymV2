import AchievementCard from "./AchievementCard";
import dumbbell from "../../assets/dumbbell.svg"
import CompletionCard from "./CompletionCard";

const achievementData = [
    { 
      title: "Speedfingers",
      description: "Achieve 200 WPM",
      progress: 75,
      image: dumbbell
    },
    { 
      title: "Top 1%",
      description: "Achieve 99th percentile",
      progress: 100,
      image: dumbbell
    },
    {
      title: "Marathon",
      description: "Complete 100 sessions",
      progress: 40,
      image: dumbbell
    },
    {
      title: "Precisionist",
      description: "Hit 100% accuracy",
      progress: 90,
      image: dumbbell
    },
    {
      title: "Night Owl",
      description: "Type after midnight",
      progress: 100,
      image: dumbbell
    },
    {
      title: "Daily Streak",
      description: "Practice 7 days straight",
      progress: 60,
      image: dumbbell
    },
    {
      title: "First Steps",
      description: "Finish your first test",
      progress: 100,
      image: dumbbell
    },
    {
      title: "Consistent",
      description: "Type daily for a month",
      progress: 25,
      image: dumbbell
    },
    {
      title: "Lightning",
      description: "Hit 250 WPM once",
      progress: 10,
      image: dumbbell
    },
    {
      title: "Sharpshooter",
      description: "95%+ accuracy 10x",
      progress: 50,
      image: dumbbell
    },
    {
      title: "Long Haul",
      description: "50 hours total",
      progress: 35,
      image: dumbbell
    },
    {
      title: "Dedicated",
      description: "Come back 30 days",
      progress: 20,
      image: dumbbell
    }
  ];

const Achievements = ({ className }) => {
    return (
        <div className={`${className} px-[2vw] py-[2vh] h-full overflow-auto`}>
            <h2 className="mb-2 text-3xl">Achievements</h2>
            {achievementData.map((item, i) => (
                <div key={i} className="mt-2">
                    {item.progress !== 100 ? (
                        <AchievementCard progress={item.progress} title={item.title} description={item.description} image={item.image}/>
                    ) : (
                        <CompletionCard title={item.title} image={item.image} description={item.description}/>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Achievements;