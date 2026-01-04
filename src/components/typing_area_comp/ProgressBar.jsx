const ProgressBar = ({ progress, height, className}) => {
    return (
        <div 
            className={`w-3/4 ${className} bg-gray-700/50 rounded-full overflow-hidden`}
            style={{ height: `${height}px`}}
        >
            <div
                className="bg-gradient-to-r from-navOrange to-orange-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar;