import { useNavigate } from 'react-router-dom';
import bulb from "../assets/bright-light-bulb.svg";
import DailyBar from '../components/home_components/DailyBar';
import CommunityGraph from '../components/home_components/CommunityGraph';
import profilePic from '../assets/selfie.jpg';
import flame from '../assets/flame.svg';
import dumbbell from '../assets/dumbbell.svg';
import RecentActivity from '../components/RecentActivity';
import Streaks from '../components/home_components/Streaks';
import DailyPromotion from '../components/home_components/DailyPromotion';
import { useDailyStatus } from '../hooks/useDailyStatus';
import CircularProgress from '@mui/material/CircularProgress';
import TipWidget from '../components/home_components/TipWidget';
import { motion } from 'framer-motion';


const widgetData = [
  { 
    title: "Training Circuit",
    description: "Grind through the fundamentals to build rock-solid muscle memory. Consistency here pays off when you’re chasing speed PRs later.",
    buttonTitle: "Typing Practice",
    route: "/practice",
  },
  { 
    title: "Top Set",
    description: "Step up to the platform and test your max with our daily typing challenge. No spotter needed—just pure speed and accuracy under the bar.",
    buttonTitle: "Daily Challenge",
    route: null,
  },
  { 
    title: "TBD",
    description: "TBD",
    buttonTitle: "TBD",
    route: null,
  }
];

const demoData = {
  timeLabels: ['9AM', '10AM', '11AM', '12PM', '1PM', 'Now'],
  avgWpms: [45, 52, 48, 57, 62, 58],
  userCounts: [82, 104, 156, 210, 187, 203],
  peakWpm: 89,
  totalCompleted: 1243
};

const practiceDescription = "Grind through the fundamentals to build rock-solid muscle memory. Consistency here pays off when you\'re chasing speed PRs later."

const Home = () => {
  const navigate = useNavigate();
  const { completed, loading, wpm } = useDailyStatus();
  return (
    <div className="flex flex-col p-[2vh] justify-center h-[95vh]">
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 p-4 w-full">
        <div className="flex flex-col justify-center gap-[3vh] rounded-2xl shadow-lg shadow-white/20 hover:shadow-orange-500/20 p-6 w-1/2 h-[42vh] bg-headerGray text-white overflow-auto hover:scale-[1.02] duration-500">
          <h2 className="text-2xl font-bold ">Training Circuit</h2>
          <p className="text-gray-300 text-lg ">{practiceDescription}</p>
          <button 
            className="px-4 py-2 w-1/2 rounded-full transition bg-navOrange text-white self-center"
            onClick={() => {
              navigate('/practice');
            }}
          >
            Typing Practice
          </button>
        </div>
        <div className="flex flex-col justify-between rounded-2xl shadow-lg shadow-white/20 hover:shadow-orange-500/20 p-6 w-1/2 h-[42vh] bg-headerGray text-white overflow-auto hover:scale-[1.02] duration-500">
          <div className=' h-full'>
            <CommunityGraph />
          </div>
        </div>
        <div className="flex flex-col justify-between  w-1/2 h-[42vh] flex-grow gap-4 p-1 text-white overflow-auto">
          <div className='flex flex-col justify-center bg-headerGray flex-1 rounded-2xl px-3 shadow-lg shadow-white/10 hover:shadow-orange-500/10 hover:scale-[1.02] duration-500'>
            <TipWidget />
          </div>
          <Streaks />
        </div>
      </div>
      <div className="flex justify-center items-start gap-8 p-4 w-full ">
        <div className="flex flex-col flex-grow justify-between rounded-2xl shadow-lg shadow-white/20 hover:shadow-orange-500/20 hover:scale-[1.02] duration-500 p-6 w-1/2 h-[42vh] bg-headerGray text-white">
          { loading &&
            <div className='w-full h-full flex items-center justify-center'>
              <CircularProgress color='white'/>
            </div>
          }
          { completed && !loading &&
            <div className='flex flex-col w-full h-full gap-2'>
              <div className='flex items-center justify-between pb-2 border-b border-gray-700/50 flex-shrink-0'>
                <div className='flex items-center gap-3'>
                  <div className='w-1 h-6 bg-navOrange rounded-full'></div>
                  <h2 className="text-xl font-bold">Daily Challenge</h2>
                  <div className='flex items-center gap-2 ml-2'>
                    <span className='text-gray-400 text-sm'>Your WPM:</span>
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 2 }}
                      className='text-2xl font-bold text-navOrange'
                    >
                      {Math.round(wpm || 0)}
                    </motion.span>
                  </div>
                </div>
                <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-navOrange/20 border border-navOrange/30'>
                  <svg className="w-4 h-4 text-navOrange" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className='text-navOrange text-xs font-semibold'>Completed</span>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <DailyBar />
              </div>
            </div>
          }
          { !completed && !loading &&
            <div className='flex w-full h-full'>
              <DailyPromotion />
            </div>
          }
        </div>
        <div className="flex flex-col justify-between rounded-2xl p-6 w-1/2 h-[42vh] bg-headerGray text-white shadow-lg shadow-white/20 hover:shadow-orange-500/20 hover:scale-[1.02] duration-500">
          <RecentActivity />
        </div>
      </div>
    </div>

  );
};
  
  export default Home;