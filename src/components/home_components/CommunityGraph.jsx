import { useDailyLeaders } from '../../hooks/useDailyLeaders';
import CircularProgress from '@mui/material/CircularProgress';

const CommunityGraph = () => {
    const { loading, fastestTyper, fastestChallenge, mostPrompts } = useDailyLeaders();
    if (loading) {
        return (
            <div className="flex flex-col w-full h-full items-center justify-center gap-[5%]">
                <CircularProgress color='white'/>
            </div>
        );
    }
    return (
        <div className="flex flex-col w-full h-full items-center justify-center gap-[5%]">
            <h2>{"Highest Speed Today"}</h2>
            <h1>{`${Math.round(fastestChallenge.wpm)} WPM`}</h1>
            <div className="flex  h-[15%] items-center gap-[1vw]">
                <img src={fastestChallenge.pic_url} className=" h-full aspect-square rounded-full object-cover"/>
                <h2>{fastestTyper.username}</h2>
            </div>
        </div>
    );
};

export default CommunityGraph;