import { useState } from 'react';
import Achievements from "../components/stat_components/Achievements";
import ProfileCard from "../components/stat_components/ProfileCard";
import Calendar from "../components/stat_components/Calendar";
import WPMGraph from "../components/stat_components/WPMGraph";
import Keyboard from "../components/stat_components/Keyboard";

const Stats = () => {
  const data = [
    { x: '2022-01-01', y: 65 },
    { x: '2023-02-01', y: 59 },
    { x: '2023-03-01', y: 80 },
  ];
  return (
    <div className="min-h-screen flex md:flex-row flex-col gap-6 py-[7vh] px-[5vw]">
      <ProfileCard className="bg-headerGray flex-shrink-0 rounded-3xl h-[30vh] md:h-auto max-h-[84vh] md:w-[25%]"/>
      <div className="flex flex-col gap-6 max-h-[84vh] md:w-[50%]">
          <Keyboard className="bg-headerGray flex-grow  rounded-3xl max-h-[42vh]" />
          <div className="flex  md:flex-row flex-col gap-6 flex-grow md:max-h-[42vh]">
              <WPMGraph wpmData={data} className="bg-headerGray rounded-3xl flex-1 md:w-[25vw]"/>
              <Calendar className="bg-headerGray rounded-3xl flex-1 md:w-[25vw]"/>
          </div>
      </div>
      <Achievements className="bg-headerGray flex-shrink-0 rounded-3xl h-[30vh] md:h-auto max-h-[84vh] md:w-1/4" />
    </div>
  );
};
  
  export default Stats;