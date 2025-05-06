const CommunityGraph = ({ image, username, stat, title }) => {
    return (
        <div className="flex flex-col w-full h-full items-center justify-center gap-[5%]">
            <h2>{title}</h2>
            <h1>{stat}</h1>
            <div className="flex  h-[15%] items-center gap-[1vw]">
                <img src={image} className=" h-full aspect-square rounded-full object-cover"/>
                <h2>{username}</h2>
            </div>
        </div>
    );
};

export default CommunityGraph;