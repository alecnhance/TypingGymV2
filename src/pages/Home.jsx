import { useNavigate } from 'react-router-dom';
import bulb from "../assets/bright-light-bulb.svg";
import DailyBar from '../components/home_components/DailyBar';


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

const practiceDescription = "Grind through the fundamentals to build rock-solid muscle memory. Consistency here pays off when you\'re chasing speed PRs later."

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col p-[2vh] justify-center h-[95vh]">
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 p-4 w-full">
        <div className="flex flex-col justify-center gap-[3vh] rounded-2xl shadow-md p-6 w-1/2 h-[42vh] bg-headerGray text-white overflow-auto">
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
        <div className="flex flex-col justify-between rounded-2xl shadow-md p-6 w-1/2 h-[42vh] bg-headerGray text-white overflow-auto">
          <h2 className="text-xl font-bold mb-2">Community</h2>
        </div>
        <div className="flex flex-col justify-between  shadow-md  w-1/2 h-[42vh] flex-grow gap-4 p-1 text-white overflow-auto">
          <div className='flex flex-col justify-center bg-headerGray flex-1 rounded-2xl px-3'>
            <div className='flex items-center gap-2'>
              <img src={bulb} className='w-[15%]' />
              <h2 className="text-xl ">Make sure to always put your fingers of the f and j keys</h2>
            </div>
          </div>
          <div className='flex flex-col justify-center bg-headerGray flex-1 rounded-2xl gap-2'>
            <h1 className="">120 WPM</h1>
            <h2 className="font-extralight">Keep Pushing!</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-start gap-8 p-4 w-full">
        <div className="flex flex-col flex-grow justify-between rounded-2xl shadow-md p-6 w-1/2 h-[42vh] bg-headerGray text-white">
          <h2 className="text-xl font-bold ">Daily Challenge</h2>
          <div className="h-full flex-1">
            <DailyBar />
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-2xl shadow-md p-6 w-1/2 h-[42vh] bg-headerGray text-white">
          <h2 className="text-xl font-bold mb-2">Recent Activity</h2>
        </div>
      </div>
    </div>

  );
};
  
  export default Home;