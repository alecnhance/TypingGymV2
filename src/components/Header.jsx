import dumbbell from '../assets/dumbbell.svg';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="flex w-full justify-between items-center p-4 bg-headerGray text-white ">
            <div className="flex items-center space-x-2">
                <img src={dumbbell} alt="Logo" className="w-6 h-6 invert" />
                <h1 className="text-lg">TypeGym</h1>
            </div>
            <nav className="space-x-6">
                <NavLink
                    to="/"
                    className={({ isActive}) => 
                        isActive ? 'font-bold text-navOrange' : 'hover:underline cursor-pointer'
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/practice"
                    className={({ isActive}) => 
                        isActive ? 'font-bold text-navOrange' : 'hover:underline cursor-pointer'
                    }
                >
                    Practice
                </NavLink>
                <NavLink
                    to="/stats"
                    className={({ isActive}) => 
                        isActive ? 'font-bold text-navOrange' : 'hover:underline cursor-pointer'
                    }
                >
                    Stats
                </NavLink>
                <NavLink
                    to="/user"
                    className={({ isActive}) => 
                        isActive ? 'font-bold text-navOrange' : 'hover:underline cursor-pointer'
                    }
                >
                    Name
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;