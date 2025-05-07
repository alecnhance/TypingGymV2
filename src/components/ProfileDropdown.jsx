import { useState } from 'react';

const ProfileDropdown = ({ options, onSelect }) => {
    const [selected, setSelected] = useState(options[0]);
  
    const handleSelect = (option) => {
      setSelected(option);
      onSelect(option);
    };
  
    return (
      <div className="relative inline-block w-32 text-white">
        <ul className="absolute z-10 w-full bg-headerGray border border-gray-600 rounded-md shadow-lg">
        {options.map((option, index) => (
            <li
            key={index}
            onClick={() => handleSelect(option)}
            className="px-4 py-2 hover:bg-navOrange hover:text-white cursor-pointer"
            >
            {option}
            </li>
        ))}
        </ul>
      </div>
    );
  };

export default ProfileDropdown;
