import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ options, onSelect }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);
  
    const handleSelect = (option) => {
      setSelected(option);
      onSelect(option.value);
      setOpen(false);
    };
  
    return (
      <div className="relative inline-block w-32">
        <button
            onClick={() => setOpen(!open)}
            className="w-full bg-transparent text-white    py-2 rounded-md text-left flex gap-2 items-center"
        >
            <span>{selected.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
  
        {open && (
          <ul className="absolute z-10 w-full mt-3 bg-headerGray border border-gray-600 rounded-md shadow-lg">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-navOrange hover:text-white cursor-pointer"
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

export default Dropdown;
