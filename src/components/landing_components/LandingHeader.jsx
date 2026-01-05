import { NavLink, useLocation } from 'react-router-dom';
import dumbbell from '../../assets/dumbbell.svg';

const LandingHeader = () => {
    const location = useLocation();
    const isLandingActive = location.pathname === '/' || location.pathname === '/landing';

    return (
        <header className="flex w-full justify-between items-center p-4 bg-headerGray text-white ">
            <div className="flex items-center space-x-2">
                <img src={dumbbell} alt="Logo" className="w-6 h-6 invert" />
                <h1 className="text-lg">TypeGym</h1>
            </div>
            <nav className="space-x-6">
                <NavLink
                    to="/landing"
                    className={({ isActive}) => 
                        isLandingActive ? 'font-bold text-navOrange' : 'hover:underline cursor-pointer'
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/freeTyping"
                    className={({ isActive}) => 
                        isActive ? 'font-bold text-navOrange ' : 'hover:underline cursor-pointer '
                    }
                >
                    Practice
                </NavLink>
                <NavLink
                    to="/signIn"
                    className={({ isActive}) => 
                        isActive 
                            ? 'bg-navOrange rounded-full text-white px-3 py-1 font-semibold' 
                            : 'cursor-pointer bg-white rounded-full text-black px-3 py-1 font-semibold transition-all duration-300 hover:bg-navOrange hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-navOrange/50'
                    }
                >
                    Sign In
                </NavLink>
            </nav>
        </header>
    );
};

export default LandingHeader;