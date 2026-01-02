import dumbbell from "../assets/dumbbell.svg";
import up from "../assets/up.svg";
import trophy from "../assets/trophy-award.svg";
import accuracy from "../assets/accuracy.svg";
import { useActivity } from "../hooks/useActivity";

const formatDate = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours < 24) {
        // Less than 24 hours ago - display time
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    } else {
        // More than 24 hours ago - display days ago
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        return `${diffDays}d ago`;
    }
};

const RecentActivity = () => {
    const { activity, loading } = useActivity();
    const recentData = [
        { 
          description: "Last Perfect Typing Session",
          date: activity?.lastperfect ? formatDate(activity.lastperfect) : "never",
          image: accuracy
        },
        { 
            description: `Personal Record ${Math.round(parseFloat(activity?.maxwpm) || 0)} WPM Hit`,
            date: activity?.pr ? formatDate(activity.pr) : "never",
            image: up
        },
        {
            description: "Daily Challenge Completed",
            date: activity?.lastdaily ? formatDate(activity.lastdaily) : "never",
            image: trophy
        }
    ];
    return (
        <div className="flex flex-col w-full h-full text-left items-center justify-between overflow-auto">
            <h2 className="text-2xl font-medium">Recent Activity</h2>
            {recentData.map((item, i) => (
                <div key={i} className="flex w-full gap-4 items-center">
                    <div className="w-[10%] bg-mainBackground p-3 rounded-full">
                        <img src={item.image} alt="AchievementPic" className="aspect-square w-full invert" />
                    </div>
                    <div className="flex w-full justify-between">
                        <h2 className="text-xl mr-1">{item.description}</h2>
                        <h2 className="text-lg font-extralight">{item.date}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecentActivity;