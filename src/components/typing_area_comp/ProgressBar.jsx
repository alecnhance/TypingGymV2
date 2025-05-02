const ProgressBar = ({ progress, height, className}) => {
    return (
        <div 
            className={`${className} w-3/4 bg-white rounded-full overflow-hidden`}
            style={{ height: `${height}px`}}
        >
            <div
                className="bg-navOrange h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;