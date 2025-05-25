import dumbbell from '../assets/dumbbell.svg';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
    const [showDrop, setDrop] = useState(false);
    const handleNameClick = () => {
        setDrop((prev) => !prev);
    }
    const navigate = useNavigate();
    const location = useLocation();
    const isUserPage = location.pathname === '/user';
    const goToProfile = () => {
        navigate("/user");
    };
    const dropOptions = ["profile", "signout"];
    const dropSelect = (option) => {
        switch (option) {
            case "profile": 
                goToProfile();
                setDrop(false);
                break;
            default: 
                setDrop(false);
                break;
        }
    }
    return (
        <header className="flex w-full justify-between items-center p-4 bg-headerGray text-white ">
            <div className="flex items-center space-x-2">
                <img src={dumbbell} alt="Logo" className="w-6 h-6 invert" />
                <h1 className="text-lg">TypeGym</h1>
            </div>
            <nav className="space-x-6">
                <NavLink
                    to="/home"
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
                <button
                    className={`hover:underline cursor-pointer ${
                        isUserPage ? 'font-bold text-navOrange' : ''
                    }`}
                    onClick={handleNameClick}
                >
                    Name
                </button>
                {showDrop && (
                    <div className="absolute right-0">
                        <ProfileDropdown options={dropOptions} onSelect={dropSelect} />
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;