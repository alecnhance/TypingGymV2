import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ChallengeArea from "../components/typing_area_comp/ChallengeArea";
import { useDailyStatus } from "../hooks/useDailyStatus";

const Challenge = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { completed, loading } = useDailyStatus();
    
    useEffect(() => {
        // Check if user came from the button (has location state)
        const fromButton = location.state?.fromButton;
        
        // If not from button (direct URL access) or already completed, redirect to home
        if (!loading) {
            if (!fromButton || completed) {
                navigate("/home", { replace: true });
            }
        }
    }, [location.state, completed, loading, navigate]);
    
    const handleExit = () => {
        navigate("/home");
    }
    
    // Don't render if redirecting
    if (loading || !location.state?.fromButton || completed) {
        return null;
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