import AchievementCard from "./AchievementCard";
import CompletionCard from "./CompletionCard";
import { 
  UserPlus, Zap, Bolt, Rocket, Gauge, Flame, Target, Crosshair, CircleDot, 
  Swords, Medal, Activity, Crown, Gem, Clock, Timer, Hourglass, 
  BookOpen, Book, Scroll, FileText, Calendar, CalendarCheck, CalendarDays, 
  Star, Sparkles, Trophy
} from 'lucide-react';

const achievementData = [
    { 
      title: "Rookie",
      description: "Complete your first typing test",
      progress: 100,
      icon: UserPlus
    },
    { 
      title: "Speed Demon",
      description: "Reach 100 WPM in a workout",
      progress: 100,
      icon: Zap
    },
    {
      title: "Lightning Fast",
      description: "Reach 150 WPM in a workout",
      progress: 45,
      icon: Bolt
    },
    {
      title: "Speedfingers",
      description: "Reach 200 WPM in a workout",
      progress: 20,
      icon: Rocket
    },
    {
      title: "Ultra Speed",
      description: "Reach 250 WPM in a workout",
      progress: 10,
      icon: Gauge
    },
    {
      title: "Legendary Speed",
      description: "Reach 300 WPM in a workout",
      progress: 5,
      icon: Flame
    },
    {
      title: "Precisionist",
      description: "Achieve 100% accuracy in a workout",
      progress: 85,
      icon: Target
    },
    {
      title: "Sharpshooter",
      description: "Achieve 98%+ accuracy 10 times",
      progress: 60,
      icon: Crosshair
    },
    {
      title: "Master Marksman",
      description: "Achieve 98%+ accuracy 50 times",
      progress: 30,
      icon: CircleDot
    },
    {
      title: "Elite Marksman",
      description: "Achieve 98%+ accuracy 100 times",
      progress: 15,
      icon: Swords
    },
    {
      title: "Centurion",
      description: "Complete 100 workouts",
      progress: 55,
      icon: Medal
    },
    {
      title: "Marathon Runner",
      description: "Complete 500 workouts",
      progress: 20,
      icon: Activity
    },
    {
      title: "Thousand Club",
      description: "Complete 1,000 workouts",
      progress: 10,
      icon: Crown
    },
    {
      title: "Two Thousand Club",
      description: "Complete 2,000 workouts",
      progress: 5,
      icon: Gem
    },
    {
      title: "Time Champion",
      description: "Log 50 total hours of practice",
      progress: 40,
      icon: Clock
    },
    {
      title: "Time Master",
      description: "Log 100 total hours of practice",
      progress: 20,
      icon: Timer
    },
    {
      title: "Time Legend",
      description: "Log 200 total hours of practice",
      progress: 10,
      icon: Hourglass
    },
    {
      title: "Word Warrior",
      description: "Type 50,000 total words",
      progress: 65,
      icon: BookOpen
    },
    {
      title: "Word Master",
      description: "Type 100,000 total words",
      progress: 35,
      icon: Book
    },
    {
      title: "Word Legend",
      description: "Type 250,000 total words",
      progress: 15,
      icon: Scroll
    },
    {
      title: "Word God",
      description: "Type 500,000 total words",
      progress: 7,
      icon: FileText
    },
    {
      title: "Daily Challenger",
      description: "Complete 30 daily challenges",
      progress: 50,
      icon: Calendar
    },
    {
      title: "Daily Master",
      description: "Complete 100 daily challenges",
      progress: 20,
      icon: CalendarCheck
    },
    {
      title: "Daily Legend",
      description: "Complete 200 daily challenges",
      progress: 10,
      icon: CalendarDays
    },
    {
      title: "Perfect Storm",
      description: "Achieve 100% accuracy 25 times",
      progress: 35,
      icon: Star
    },
    {
      title: "Perfect Master",
      description: "Achieve 100% accuracy 50 times",
      progress: 18,
      icon: Sparkles
    },
    {
      title: "Perfect Legend",
      description: "Achieve 100% accuracy 100 times",
      progress: 9,
      icon: Trophy
    }
  ];

const Achievements = ({ className }) => {
    return (
        <div className={`${className} px-[2vw] py-[2vh] h-full overflow-auto`}>
            <h2 className="mb-2 text-3xl">Achievements</h2>
            {achievementData.map((item, i) => (
                <div key={i} className="mt-2">
                    {item.progress !== 100 ? (
                        <AchievementCard progress={item.progress} title={item.title} description={item.description} icon={item.icon}/>
                    ) : (
                        <CompletionCard title={item.title} icon={item.icon} description={item.description}/>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Achievements;