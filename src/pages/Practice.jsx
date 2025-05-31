import TypingArea from "../components/typing_area_comp/TypingArea";

const Practice = () => {
    return (
      <div className="flex justify-center padding-8 h-[95vh] py-[2vh]">
        <div className="flex flex-col w-full items-center">
          <TypingArea isFree={true}/>
        </div>
      </div>
    );
  };
  
  export default Practice;