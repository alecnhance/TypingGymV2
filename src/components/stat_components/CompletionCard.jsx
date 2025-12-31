const CompletionCard = ({ icon: Icon, title, description }) => {
    return (
        <div className="flex items-center gap-2 h-[70px] flex-grow">
            <div className='h-[100%] aspect-square object-cover bg-navOrange p-2 rounded-3xl flex items-center justify-center'>
                {Icon && <Icon className='w-full h-full text-white' strokeWidth={1.5}/>}
            </div>
            <div className='flex flex-col h-full text-left justify-center py-2'>
                <p className="text-lg text-white font-bold truncate line-clamp-1">{title}</p>
                <p className="text-xs font-extralight text-white  truncate line-clamp-1">{description}</p>
            </div>
        </div>
    );
};

export default CompletionCard;