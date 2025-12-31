import AchievementCard from "./AchievementCard";
import CompletionCard from "./CompletionCard";
import { 
  UserPlus, Zap, Bolt, Rocket, Gauge, Flame, Target, Crosshair, CircleDot, 
  Swords, Medal, Activity, Crown, Gem, Clock, Timer, Hourglass, 
  BookOpen, Book, Scroll, FileText, Calendar, CalendarCheck, CalendarDays, 
  Star, Sparkles, Trophy
} from 'lucide-react';
import { useAchievements } from '../../hooks/useAchievements';

const getAchievementData = (achievements) => {
  // Handle null/undefined achievements
  if (!achievements) {
    return [];
  }

  const {
    total_prompts = 0,
    max_wpm = 0,
    perfect_accuracy_count = 0,
    total_duration_seconds = 0,
    total_chars = 0,
    daily_prompt_count = 0
  } = achievements;

  // Helper function to calculate progress percentage
  const calcProgress = (current, target) => {
    if (current >= target) return 100;
    return Math.min(100, (current / target) * 100);
  };

  return [
    { 
      title: "Rookie",
      description: "Complete your first typing test",
      progress: total_prompts > 0 ? 100 : 0,
      icon: UserPlus
    },
    { 
      title: "Speed Demon",
      description: "Reach 100 WPM in a workout",
      progress: calcProgress(max_wpm, 100),
      icon: Zap
    },
    {
      title: "Lightning Fast",
      description: "Reach 150 WPM in a workout",
      progress: calcProgress(max_wpm, 150),
      icon: Bolt
    },
    {
      title: "Speedfingers",
      description: "Reach 200 WPM in a workout",
      progress: calcProgress(max_wpm, 200),
      icon: Rocket
    },
    {
      title: "Ultra Speed",
      description: "Reach 250 WPM in a workout",
      progress: calcProgress(max_wpm, 250),
      icon: Gauge
    },
    {
      title: "Legendary Speed",
      description: "Reach 300 WPM in a workout",
      progress: calcProgress(max_wpm, 300),
      icon: Flame
    },
    {
      title: "Precisionist",
      description: "Achieve 100% accuracy in a workout",
      progress: perfect_accuracy_count > 0 ? 100 : 0,
      icon: Target
    },
    {
      title: "Centurion",
      description: "Complete 100 workouts",
      progress: calcProgress(total_prompts, 100),
      icon: Medal
    },
    {
      title: "Marathon Runner",
      description: "Complete 500 workouts",
      progress: calcProgress(total_prompts, 500),
      icon: Activity
    },
    {
      title: "Thousand Club",
      description: "Complete 1,000 workouts",
      progress: calcProgress(total_prompts, 1000),
      icon: Crown
    },
    {
      title: "Two Thousand Club",
      description: "Complete 2,000 workouts",
      progress: calcProgress(total_prompts, 2000),
      icon: Gem
    },
    {
      title: "Time Champion",
      description: "Log 50 total hours of practice",
      progress: calcProgress(total_duration_seconds, 50 * 3600),
      icon: Clock
    },
    {
      title: "Time Master",
      description: "Log 100 total hours of practice",
      progress: calcProgress(total_duration_seconds, 100 * 3600),
      icon: Timer
    },
    {
      title: "Time Legend",
      description: "Log 200 total hours of practice",
      progress: calcProgress(total_duration_seconds, 200 * 3600),
      icon: Hourglass
    },
    {
      title: "Word Warrior",
      description: "Type 50,000 total words",
      progress: calcProgress(total_chars / 5, 50000),
      icon: BookOpen
    },
    {
      title: "Word Master",
      description: "Type 100,000 total words",
      progress: calcProgress(total_chars / 5, 100000),
      icon: Book
    },
    {
      title: "Word Legend",
      description: "Type 250,000 total words",
      progress: calcProgress(total_chars / 5, 250000),
      icon: Scroll
    },
    {
      title: "Word God",
      description: "Type 500,000 total words",
      progress: calcProgress(total_chars / 5, 500000),
      icon: FileText
    },
    {
      title: "Daily Challenger",
      description: "Complete 30 daily challenges",
      progress: calcProgress(daily_prompt_count, 30),
      icon: Calendar
    },
    {
      title: "Daily Master",
      description: "Complete 100 daily challenges",
      progress: calcProgress(daily_prompt_count, 100),
      icon: CalendarCheck
    },
    {
      title: "Daily Legend",
      description: "Complete 200 daily challenges",
      progress: calcProgress(daily_prompt_count, 200),
      icon: CalendarDays
    },
    {
      title: "Perfect Storm",
      description: "Achieve 100% accuracy 25 times",
      progress: calcProgress(perfect_accuracy_count, 25),
      icon: Star
    },
    {
      title: "Perfect Master",
      description: "Achieve 100% accuracy 50 times",
      progress: calcProgress(perfect_accuracy_count, 50),
      icon: Sparkles
    },
    {
      title: "Perfect Legend",
      description: "Achieve 100% accuracy 100 times",
      progress: calcProgress(perfect_accuracy_count, 100),
      icon: Trophy
    }
  ];
};

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