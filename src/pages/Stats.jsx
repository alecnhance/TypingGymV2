import Achievements from "../components/stat_components/Achievements";
import ProfileCard from "../components/stat_components/ProfileCard";
import Calendar from "../components/stat_components/Calendar";
import WPMGraph from "../components/stat_components/WPMGraph";
import Keyboard from "../components/stat_components/Keyboard";

const Stats = () => {
    return (
      <div className="min-h-screen flex md:flex-row flex-col gap-6 py-[7vh] px-[5vw]">
        <ProfileCard className="bg-headerGray flex-shrink-0 rounded-3xl h-[30vh] md:h-auto max-h-[84vh] md:w-[25%]"/>
        <div className="flex flex-col gap-6 max-h-[84vh]">
            <Keyboard className="bg-headerGray flex-grow  rounded-3xl" />
            <div className="flex md:flex-row flex-col gap-6 flex-grow ">
                <WPMGraph className="bg-headerGray rounded-3xl"/>
                <Calendar className="bg-headerGray rounded-3xl"/>
            </div>
        </div>
        <Achievements className="bg-headerGray flex-shrink-0 rounded-3xl h-[30vh] md:h-auto max-h-[84vh] md:w-1/4" />
      </div>
    );
  };
  
  export default Stats;