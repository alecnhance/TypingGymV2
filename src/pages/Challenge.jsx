import { useNavigate } from "react-router-dom";
import ChallengeArea from "../components/typing_area_comp/ChallengeArea";

const Challenge = () => {
    const navigate = useNavigate();
    const handleExit = () => {
        navigate("/home");
    }
    return (
        <div className="flex justify-center padding-8 h-[100vh] py-[10vh] px-[15vw] bg-mainBackground">
            <div className="flex flex-col w-full items-center">
                <ChallengeArea/>
            </div>
      </div>
    )
}

export default Challenge;