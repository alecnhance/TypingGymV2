import ProgressBar from '../typing_area_comp/ProgressBar';
import { motion } from 'framer-motion';

const AchievementCard = ({ progress, title, description, icon: Icon }) => {
    return (
        <motion.div 
            className="flex items-center gap-3 h-[80px] flex-grow p-2 rounded-xl bg-mainBackground/30 border border-gray-700/30"
            whileHover={{ 
                scale: 1.02,
                backgroundColor: 'rgba(22, 22, 22, 0.5)',
                borderColor: 'rgba(245, 151, 47, 0.3)',
                boxShadow: '0 4px 6px -1px rgba(245, 151, 47, 0.1)'
            }}
            transition={{ duration: 0.2 }}
        >
            <div className='h-[60px] w-[60px] aspect-square bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-3 rounded-xl flex items-center justify-center border border-gray-600/30 flex-shrink-0'>
                {Icon && <Icon className='w-full h-full text-gray-300' strokeWidth={1.5}/>}
            </div>
            <div className='flex flex-col h-full w-full text-left justify-between py-1.5 min-w-0'>
                <div className='flex items-center justify-between gap-2'>
                    <p className="text-base font-semibold text-white truncate">{title}</p>
                    <span className='text-xs font-medium text-navOrange flex-shrink-0'>{Math.round(progress)}%</span>
                </div>
                <p className="text-xs text-gray-400 truncate mb-1">{description}</p>
                <div className='relative'>
                    <ProgressBar progress={progress} height="4" className="w-full"/>
                </div>
            </div>
        </motion.div>
    );
};

export default AchievementCard;