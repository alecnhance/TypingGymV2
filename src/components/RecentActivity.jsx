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
        <div className="flex flex-col w-full h-full text-left justify-between overflow-auto gap-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-700/50">
                <div className="w-1 h-6 bg-navOrange rounded-full"></div>
                <h2 className="text-lg font-semibold text-gray-300 uppercase tracking-wide">Activity</h2>
            </div>
            <div className="flex flex-col w-full gap-3 flex-1 justify-center">
                {recentData.map((item, i) => (
                    <div 
                        key={i} 
                        className="flex w-full gap-4 items-center p-3 rounded-xl bg-mainBackground/50 hover:bg-mainBackground/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:shadow-orange-500/10"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-navOrange/20 to-orange-600/20 p-3 rounded-full flex-shrink-0 border border-navOrange/30 shadow-sm">
                            <img src={item.image} alt="AchievementPic" className="aspect-square w-full invert opacity-90" />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0 gap-1">
                            <h2 className="text-lg font-medium leading-tight">{item.description}</h2>
                            <div className="flex items-center gap-2">
                                <span className={`text-sm px-2 py-1 rounded-full font-medium ${
                                    item.date === "never" 
                                        ? "bg-gray-700/50 text-gray-400" 
                                        : "bg-navOrange/20 text-navOrange"
                                }`}>
                                    {item.date}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentActivity;