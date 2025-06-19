import { useState } from 'react';
import Achievements from "../components/stat_components/Achievements";
import ProfileCard from "../components/stat_components/ProfileCard";
import TypingCalendar from "../components/stat_components/TypingCalendar";
import WPMGraph from "../components/stat_components/WPMGraph";
import Keyboard from "../components/stat_components/Keyboard";
import { useWPMGraph } from '../hooks/useWPMGraph';

const Stats = () => {
  const { graph, loading } = useWPMGraph();
  return (
    <div className="flex md:flex-row flex-col gap-6 mt-auto mb-auto md:h-[95vh] justify-center py-[2vh]">
      <ProfileCard className="bg-headerGray flex-shrink-0 rounded-3xl h-[30vh] md:h-auto  md:w-[25%]"/>
      <div className="flex flex-col gap-6  md:w-[45%]">
          <Keyboard className="bg-headerGray flex-grow  rounded-3xl max-h-[50%]" />
          <div className="flex  md:flex-row flex-col gap-6 flex-grow md:max-h-[50%]">
              <WPMGraph wpmData={graph} className="bg-headerGray rounded-3xl flex-1 md:max-w-[20vw]"/>
              <TypingCalendar className="bg-headerGray rounded-3xl flex-1 md:max-w-[25vw] h-full" />
          </div>
      </div>
      <Achievements className="bg-headerGray flex-shrink-0 rounded-3xl h-[30vh] md:h-auto md:w-[25%]" />
    </div>
  );
};
  
export default Stats;