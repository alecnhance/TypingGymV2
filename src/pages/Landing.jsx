import builder from "../assets/builder.svg";
import selfie from "../assets/selfie.jpg";
import keyboard from "../assets/keyboard.svg";
import checkMark from "../assets/checkMark.svg";
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUsage } from '../hooks/useUsage';

const formatNumber = (num) => {
    if (num >= 1000000) {
        return `${Math.floor(num / 1000000)}M +`;
    } else if (num >= 1000) {
        return `${Math.floor(num / 1000)}K +`;
    } else {
        return num.toString();
    }
};

const Landing = () => {
    const navigate = useNavigate();
    const { usage, loading } = useUsage();
    const {
        total_words = 0,
        num_users = 0,
        daily_challengers = 0,
        random_pics = null
     } = usage || {};
    
    const randomPics = random_pics && random_pics.length > 0 
        ? random_pics.filter(pic => pic !== null) 
        : [selfie, selfie, selfie];
    const createAccountHandle = () => {
        navigate("/signUp");
    }

    const navigateToPractice = () => {
        navigate("/freeTyping");
    }

    return (
        <div className="flex flex-col gap-6 mt-auto mb-auto md:h-[95vh] py-[2vh] bg-mainBackground items-center">
            <div className=' flex bg-headerGray w-[90vw] h-[64%] rounded-3xl px-[10vh] py-[10vh] shadow-lg shadow-white/20 hover:shadow-orange-500/20 hover:scale-[1.02] duration-500'>
                <div className='flex flex-col w-full h-full items-center justify-between'>
                    <div className="flex flex-col text-left gap-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1 h-12 bg-navOrange rounded-full"></div>
                            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Where Typing Meets Training, and Your Words Become Workouts</h2>
                        </div>
                        <h3 className="text-gray-300 text-lg font-medium">Custom Prompts and Numerous Achievements</h3>
                    </div>
                    <div className="flex gap-4 w-full justify-center">
                        <button
                            className="rounded-full w-[47%] px-4 py-3 bg-navOrange text-mainBackground font-semibold  duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 hover:bg-orange-500"
                            onClick={createAccountHandle}
                        >
                            Create Account
                        </button>
                        <button
                            className="rounded-full w-[47%] px-6 py-3 bg-navOrange text-mainBackground font-semibold duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 hover:bg-orange-500"
                            onClick={navigateToPractice}
                        >
                            Try Sample
                        </button>
                    </div>
                </div>
                <div className='flex w-full h-full justify-center items-center relative'>
                    <div className='absolute inset-0 bg-navOrange/10 rounded-full blur-2xl opacity-50'></div>
                    <img src={builder} className="relative aspect-square w-[50%] invert drop-shadow-lg"/>
                </div>
            </div>
            <div className='flex flex-col md:flex-row w-full h-[26%] gap-[3vw] justify-center '>
                <div className='flex bg-headerGray  w-full md:w-[20%] rounded-3xl  text-left justify-end py-[4vh] px-[1.5vw] gap-3  shadow-lg shadow-white/20 hover:shadow-orange-500/20 hover:scale-[1.02] duration-500'>
                    <div className="flex flex-col w-[50%] h-full justify-end gap-[1.5vh]">
                        <h2 className="font-extralight text-gray-400 text-sm uppercase tracking-wide">Engaged Users</h2>
                        <h2 className="text-4xl text-white font-bold">{formatNumber(num_users)}</h2>
                    </div>
                    <div className="flex flex-col w-[50%] h-full justify-end items-end">
                        <div className="w-full flex justify-center">
                            {randomPics.map((item, i) => (
                                <img key={i} src={item} className="aspect-square rounded-full object-cover w-[33%] -ml-4 "/>  
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex bg-headerGray  w-full md:w-[20%] rounded-3xl  text-left justify-end py-[4vh] px-[1.5vw] gap-3 shadow-lg shadow-white/20 hover:shadow-orange-500/20 hover:scale-[1.02] duration-500'>
                    <div className="flex flex-col w-[50%] h-full justify-end gap-[1.5vh]">
                        <h2 className="font-extralight text-gray-400 text-sm uppercase tracking-wide">Words Typed</h2>
                        <h2 className="text-4xl text-white font-bold">{formatNumber(total_words)}</h2>
                    </div>
                    <div className="flex flex-col w-[50%] h-full justify-end items-end">
                        <div className="w-[50%] aspect-square rounded-full bg-navOrange/10 flex items-center justify-center shadow-lg shadow-navOrange/20">
                            <img src={keyboard} className="invert w-10 h-10 opacity-80"/>
                        </div>
                    </div>
                </div>
                <div className='flex bg-headerGray  w-full md:w-[20%] rounded-3xl  text-left justify-end py-[4vh] pl-[1.5vw] gap-3 shadow-lg shadow-white/20 hover:shadow-orange-500/20 hover:scale-[1.02] duration-500'>
                    <div className="flex flex-col w-[50%] h-full justify-end gap-[1.5vh]">
                        <h2 className="font-extralight text-gray-400 text-sm uppercase tracking-wide">Daily Challengers</h2>
                        <h2 className="text-4xl text-white font-bold">{formatNumber(daily_challengers)}</h2>
                    </div>
                    <div className="flex flex-col w-[50%] h-full justify-end items-end pr-[1.5vw]">
                        <div className="w-[50%] aspect-square rounded-full bg-navOrange/10 flex items-center justify-center shadow-lg shadow-navOrange/20">
                            <img src={checkMark} className="invert w-10 h-10 opacity-80"/>
                        </div>
                    </div>
                </div>
                <div className='flex bg-headerGray  w-full md:w-[20%] rounded-3xl  text-left justify-end py-[4vh] pl-[1.5vw] gap-3 shadow-lg shadow-white/20 hover:shadow-orange-500/20 hover:scale-[1.02] duration-500 cursor-pointer group' onClick={navigateToPractice}>
                    <div className="flex flex-col w-[50%] h-full justify-end gap-[1.5vh]">
                        <h2 className="font-extralight text-gray-400 text-sm uppercase tracking-wide">Guest Mode</h2>
                        <h2 className="text-4xl text-white font-bold">Practice</h2>
                    </div>
                    <div className="flex flex-col w-[50%] h-full justify-top items-end pr-[1.5vw] ">
                        <ChevronRight className="aspect-square w-[60%] transition-transform duration-300 group-hover:translate-x-1"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
