import { motion } from 'framer-motion';

const CompletionCard = ({ icon: Icon, title, description }) => {
    return (
        <motion.div 
            className="flex items-center gap-3 h-[80px] flex-grow p-2 rounded-xl bg-navOrange/10 border border-navOrange/30 relative overflow-hidden"
            whileHover={{ 
                scale: 1.02,
                borderColor: 'rgba(245, 151, 47, 0.5)',
                boxShadow: '0 10px 15px -3px rgba(245, 151, 47, 0.2)'
            }}
            transition={{ duration: 0.2 }}
        >
            <div className='absolute inset-0 bg-gradient-to-br from-navOrange/5 to-orange-600/5 opacity-50 pointer-events-none'></div>
            <div className='h-[60px] w-[60px] aspect-square bg-gradient-to-br from-navOrange to-orange-600 p-3 rounded-xl flex items-center justify-center border border-navOrange/50 flex-shrink-0 relative z-10 shadow-md shadow-orange-500/30'>
                {Icon && <Icon className='w-full h-full text-white' strokeWidth={1.5}/>}
                <div className='absolute -top-1 -right-1 w-5 h-5 bg-navOrange rounded-full flex items-center justify-center border-2 border-headerGray shadow-md'>
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className='flex flex-col h-full text-left justify-center py-1.5 min-w-0 relative z-10'>
                <div className='flex items-center gap-2 mb-1'>
                    <p className="text-base font-bold text-white truncate">{title}</p>
                    <span className='text-xs font-semibold text-navOrange bg-navOrange/20 px-2 py-0.5 rounded-full flex-shrink-0'>Completed</span>
                </div>
                <p className="text-xs text-gray-300 truncate">{description}</p>
            </div>
        </motion.div>
    );
};

export default CompletionCard;