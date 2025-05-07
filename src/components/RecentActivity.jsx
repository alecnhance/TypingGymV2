import dumbbell from "../assets/dumbbell.svg";
import up from "../assets/up.svg";
import trophy from "../assets/trophy-award.svg";
import check from "../assets/check.svg";

const recentData = [
    { 
      description: "Speedfingers Achieved",
      date: "2d ago",
      image: trophy
    },
    { 
        description: "Personal Record 156 WPM Hit",
        date: "3d ago",
        image: up
    },
    {
        description: "Daily Challenge Completed",
        date: "12:33 pm",
        image: check
    }
  ];


const RecentActivity = () => {
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