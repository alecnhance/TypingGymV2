import TypingArea from "../typing_area_comp/TypingArea";

const FreeTyping = () => {
    return (
        <div className="flex justify-center padding-8 h-[95vh] py-[2vh]">
          <div className="flex flex-col w-full items-center">
            <TypingArea isFree={false}/>
          </div>
        </div>
      );
};

export default FreeTyping;