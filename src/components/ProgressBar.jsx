const ProgressBar = ({ progress }) => {
    return (
        <div className="w-3/4 bg-white rounded-full h-2 overflow-hidden">
            <div
                className="bg-navOrange h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;