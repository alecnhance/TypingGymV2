import { useNavigate } from "react-router-dom";

const Challenge = () => {
    const navigate = useNavigate();
    const handleExit = () => {
        navigate("/home");
    }
    return (
        <div className="flex justify-center padding-8 h-[100vh] py-[2vh]">
            <h2>Challenge</h2>
            <button
                className='border'
                onClick={handleExit}
            >
                Back
            </button>
        </div>
    )
}

export default Challenge;