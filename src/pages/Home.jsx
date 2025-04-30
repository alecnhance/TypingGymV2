import { useNavigate } from 'react-router-dom';

const widgetData = [
  { 
    title: "Training Circuit",
    description: "Grind through the fundamentals to build rock-solid muscle memory. Consistency here pays off when you’re chasing speed PRs later.",
    buttonTitle: "Typing Practice",
    route: "/practice",
  },
  { 
    title: "Top Set",
    description: "Step up to the platform and test your max with our daily typing challenge. No spotter needed—just pure speed and accuracy under the bar.",
    buttonTitle: "Daily Challenge",
    route: null,
  },
  { 
    title: "TBD",
    description: "TBD",
    buttonTitle: "TBD",
    route: null,
  }
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col p-4 justify-start">
      <div className="flex justify-center items-start gap-8 p-4 w-full">
        {widgetData.map((item, i) => (
          <div key={i} className="flex flex-col justify-between rounded-2xl shadow-md p-6 w-1/2 h-[30vh] bg-headerGray text-white overflow-auto">
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p className="text-gray-300 mb-4">{item.description}</p>
            <button 
              className="mt-auto px-4 py-2 w-1/2 rounded-full transition bg-navOrange text-white self-center"
              onClick={() => {
                if (item.route) navigate(item.route);
              }}
            >
              {item.buttonTitle}
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-start gap-8 p-4 w-full">
        {[1, 2].map((i) => (
          <div key={i} className="flex flex-col justify-between rounded-2xl shadow-md p-6 w-1/2 h-[50vh] bg-headerGray text-white">
            <p className="text-gray-300 mb-4">{i}</p>
          </div>
        ))}
      </div>
    </div>

  );
};
  
  export default Home;