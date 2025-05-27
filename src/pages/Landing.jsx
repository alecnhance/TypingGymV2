import builder from "../assets/builder.svg";
import selfie from "../assets/selfie.jpg";
import keyboard from "../assets/keyboard.svg";
import checkMark from "../assets/checkMark.svg";
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    const createAccountHandle = () => {
        navigate("/signUp");
    }

    const navigateToPractice = () => {
        navigate("/freeTyping");
    }

    return (
        <div className="flex flex-col gap-6 mt-auto mb-auto md:h-[95vh] py-[2vh] bg-mainBackground items-center">
            <div className=' flex bg-headerGray w-[90vw] h-[64%] rounded-3xl px-[10vh] py-[10vh]'>
                <div className='flex flex-col w-full h-full items-center justify-between'>
                    <div className="flex flex-col text-left gap-2">
                        <h2 className="text-white text-5xl font-bold leading-[3.5rem]">Where Typing Meets Training, and Your Words Become Workouts</h2>
                        <h3 className="text-white font-extralight">Custom Prompts and Numerous Achievements</h3>
                    </div>
                    <div className="flex gap-[3vw] w-full justify-center">
                        <button
                            className="rounded-full w-[47%] px-4 py-2 bg-navOrange text-mainBackground"
                            onClick={createAccountHandle}
                        >
                            Create Account
                        </button>
                        <button
                            className="rounded-full w-[47%] px-6 py-2 bg-navOrange text-mainBackground"
                            onClick={navigateToPractice}
                        >
                            Try Sample
                        </button>
                    </div>
                </div>
                <div className='flex w-full h-full justify-center'>
                    <img src={builder} className="aspect-square w-[30%] invert"/>
                </div>
            </div>
            <div className='flex flex-col md:flex-row w-full h-[26%] gap-[3vw] justify-center'>
                <div className='flex bg-headerGray  w-full md:w-[20%] rounded-3xl  text-left justify-end py-[4vh] px-[1.5vw] gap-3'>
                    <div className="flex flex-col w-[50%] h-full justify-end gap-[1.5vh]">
                        <h2 className="font-extralight">Engaged Users</h2>
                        <h2 className=" text-4xl ">100K+</h2>
                    </div>
                    <div className="flex flex-col w-[50%] h-full justify-end items-end">
                        <div className="w-full flex justify-center">
                            {[1, 2, 3].map((item, i) => (
                                <img key={i} src={selfie} className="aspect-square rounded-full object-cover w-[33%] -ml-4 "/>  
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex bg-headerGray  w-full md:w-[20%] rounded-3xl  text-left justify-end py-[4vh] px-[1.5vw] gap-3'>
                    <div className="flex flex-col w-[50%] h-full justify-end gap-[1.5vh]">
                        <h2 className="font-extralight">Words Typed</h2>
                        <h2 className=" text-4xl ">10M+</h2>
                    </div>
                    <div className="flex flex-col w-[50%] h-full justify-end items-end">
                        <img src={keyboard} className="invert aspect-square w-[50%]"/>
                    </div>
                </div>
                <div className='flex bg-headerGray  w-full md:w-[20%] rounded-3xl  text-left justify-end py-[4vh] pl-[1.5vw] gap-3'>
                    <div className="flex flex-col w-[50%] h-full justify-end gap-[1.5vh]">
                        <h2 className="font-extralight">Daily Challengers</h2>
                        <h2 className=" text-4xl ">1100+</h2>
                    </div>
                    <div className="flex flex-col w-[50%] h-full justify-end items-end pr-[1.5vw]">
                        <img src={checkMark} className="invert aspect-square w-[50%]"/>
                    </div>
                </div>
                <div className='flex bg-headerGray  w-full md:w-[20%] rounded-3xl  text-left justify-end py-[4vh] pl-[1.5vw] gap-3' onClick={navigateToPractice}>
                    <div className="flex flex-col w-[50%] h-full justify-end gap-[1.5vh]">
                        <h2 className="font-extralight">Guest Mode</h2>
                        <h2 className=" text-4xl ">Practice</h2>
                    </div>
                    <div className="flex flex-col w-[50%] h-full justify-top items-end pr-[1.5vw] ">
                        <ChevronRight className=" aspect-square w-[60%]"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
