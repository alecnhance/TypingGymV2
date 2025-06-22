import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PressToPlay = ({ showText }) => {
    return showText ? (
      <motion.h2
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        Press To Play
      </motion.h2>
    ) : (
        <h2 className='opacity-0'>Press To Play</h2>
    );
  };

const BenchPressWidget = () => {
  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/challenge');
  }

  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      className="relative w-full h-full"
    >
        <svg viewBox="25 33 250 97" className="w-full h-full">
        {/* Bench */}
        <rect x="50" y="120" width="200" height="20" fill="#FFFFFF" />
        <text x="150" y="134" textAnchor="middle" fill="black" fontSize="15" fontFamily="sans-serif" fontWeight="bold">
            Daily Challenge
        </text>

        {/* Stands */}
        <rect x="80" y="40" width="10" height="80" fill="#FFFFFF" />
        <rect x="210" y="40" width="10" height="80" fill="#FFFFFF" />

        {/* Bar */}
        <rect x="50" y="50" width="200" height="6" fill="#FFFFFF" />

        {/* Seat bar */}
        <rect x="145" y="100" width="10" height="20" fill="#FFFFFF" />

        {/* Seat */}
        <rect x="120" y="90" width="60" height="15" rx="8" ry="8" fill="#FFFFFF" />

        {/* Left Weights */}
        <motion.rect
            x="65" y="33" width="10" height="40" fill="#F5972F" rx="5" ry="5"
            initial={{ x: -30, opacity: 0 }}
            animate={hovered ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
            transition={{ duration: 0.5 }}
        />
        <motion.rect
            x="55" y="33" width="10" height="40" fill="#F5972F" rx="5" ry='5'
            initial={{ x: -30, opacity: 0 }}
            animate={hovered ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
        />

        {/* Right Weights */}
        <motion.rect
            x="225" y="33" width="10" height="40" fill="#F5972F" rx="5" ry="5"
            initial={{ x: 30, opacity: 0 }}
            animate={hovered ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
            transition={{ duration: 0.5 }}
        />
        <motion.rect
            x="235" y="33" width="10" height="40" fill="#F5972F" rx="5" ry="5"
            initial={{ x: 30, opacity: 0 }}
            animate={hovered ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
        />
        </svg>
        <PressToPlay showText={hovered}/>
    </div>
  );
};

export default BenchPressWidget;
