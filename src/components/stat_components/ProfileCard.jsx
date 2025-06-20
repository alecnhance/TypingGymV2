import selfie from '../../assets/selfie.jpg';
import blank from '../../assets/blank-profile.jpg';
import { useUserData } from '../../UserContext';
import { useSummary } from '../../hooks/useSummary';

const titles = ["Mr.Consistent", "Speedfingers", "Top 1%"];

const ProfileCard = ({ className }) => {
    const userData = useUserData();
    const username = userData?.username || "username";
    const picture = userData?.pic_url || blank;
    const { summary, loading } = useSummary();
    return (
        <div className={`${className} flex flex-col items-center font-extralight overflow-auto justify-between py-10`}>
            <img src={picture} alt="profilePic" className='w-[50%] aspect-square rounded-full object-cover' />
            <h2 className='mt-5 text-2xl font-medium'>{username}</h2>
            <h3 className='mt-1 text-md px-3'>My goal is to be the fastest typer at Gatech</h3>
            <div className="w-full text-left px-3 mt-4">
                <h3 className='text-md font-medium'>Titles</h3>
            </div>
            <div className='flex flex-wrap gap-1 px-3 mt-2 justify-left'>
                {titles.map((item, i) => (
                    <div key={i} className="px-3 rounded-3xl bg-navOrange">
                        <h2 className='font-medium'>{item}</h2>
                    </div>
                ))}
            </div>
            <div className="w-full text-left px-3 mt-4">
                <h3 className='text-md font-medium'>Typing Summary</h3>
            </div>
            <div className='w-full'>
                <div className='flex justify-between w-full px-3 mt-2'>
                    <h2>Start Date:</h2>
                    <h2>{summary?.creation_date || '01/01/2000'}</h2>
                </div>
                <div className='flex justify-between w-full px-3'>
                    <h2>Completed Prompts:</h2>
                    <h2>{summary?.num_prompts || 1443}</h2>
                </div>
                <div className='flex justify-between w-full px-3'>
                    <h2>Daily Challenges:</h2>
                    <h2>{summary?.daily_challenges || 50}</h2>
                </div>
                <div className='flex justify-between w-full px-3'>
                    <h2>WPM</h2>
                    <h2>{summary?.avg_recent_wpm|| 88}</h2>
                </div>
                <div className='flex justify-between w-full px-3'>
                    <h2>Total Characters</h2>
                    <h2>{summary?.tot_chars || 500}</h2>
                </div>
            </div>

        </div>
    );
};

export default ProfileCard;