import selfie from '../../assets/selfie.jpg';
import blank from '../../assets/blank-profile.jpg';
import { useUserData } from '../../UserContext';
import { useSummary } from '../../hooks/useSummary';
import { useAchievements } from '../../hooks/useAchievements';
import { getAchievementData } from '../../utils/achievements';
import { Calendar, Zap, Trophy, FileText } from 'lucide-react';

const formatNumber = (num) => {
    if (!num) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
        return dateString;
    }
};

const ProfileCard = ({ className }) => {
    const userData = useUserData();
    const { summary, loading } = useSummary();
    const { loading: achievementsLoading, achievements } = useAchievements();
    const achievementData = getAchievementData(achievements);
    const username = userData?.username || "username";
    const picture = userData?.pic_url || blank;
    const completedTitles = achievementData.filter(item => item.progress >= 100);
    
    return (
        <div className={`${className} flex flex-col overflow-auto shadow-lg shadow-white/20 hover:shadow-orange-500/20 hover:scale-[1.02] duration-500 px-6 py-8`}>
            {/* Profile Section */}
            <div className='flex flex-col items-center mb-6'>
                <div className='relative mb-4'>
                    <div className='absolute inset-0 bg-navOrange rounded-full blur-md opacity-30'></div>
                    <img 
                        src={picture} 
                        alt="profilePic" 
                        className='relative w-32 h-32 aspect-square rounded-full object-cover border-4 border-navOrange/30 shadow-lg' 
                    />
                </div>
                <h2 className='text-2xl font-bold text-white'>{username}</h2>
            </div>

            {/* Titles Section */}
            {completedTitles.length > 0 && (
                <div className='mb-6'>
                    <div className='flex items-center gap-2 mb-3 pb-2 border-b border-gray-700/50'>
                        <div className='w-1 h-6 bg-navOrange rounded-full'></div>
                        <h3 className='text-lg font-bold text-white'>Titles</h3>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        {completedTitles.map((item, i) => (
                            <div 
                                key={i} 
                                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-navOrange to-orange-600 border border-navOrange/50 shadow-md"
                            >
                                <h2 className='text-sm font-semibold text-white'>{item.title}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Typing Summary Section */}
            <div className='flex-1'>
                <div className='flex items-center gap-2 mb-4 pb-2 border-b border-gray-700/50'>
                    <div className='w-1 h-6 bg-navOrange rounded-full'></div>
                    <h3 className='text-lg font-bold text-white'>Summary</h3>
                </div>
                <div className='space-y-3'>
                    <div className='flex items-center justify-between p-3 rounded-lg bg-mainBackground/30 border border-gray-700/30 hover:border-navOrange/30 transition-colors'>
                        <div className='flex items-center gap-2'>
                            <Calendar className='w-4 h-4 text-gray-400' />
                            <span className='text-sm text-gray-400'>Start Date</span>
                        </div>
                        <span className='text-sm font-semibold text-white'>{formatDate(summary?.creation_date) || 'N/A'}</span>
                    </div>
                    <div className='flex items-center justify-between p-3 rounded-lg bg-mainBackground/30 border border-gray-700/30 hover:border-navOrange/30 transition-colors'>
                        <div className='flex items-center gap-2'>
                            <FileText className='w-4 h-4 text-gray-400' />
                            <span className='text-sm text-gray-400'>Prompts</span>
                        </div>
                        <span className='text-sm font-semibold text-white'>{formatNumber(summary?.num_prompts) || '0'}</span>
                    </div>
                    <div className='flex items-center justify-between p-3 rounded-lg bg-mainBackground/30 border border-gray-700/30 hover:border-navOrange/30 transition-colors'>
                        <div className='flex items-center gap-2'>
                            <Trophy className='w-4 h-4 text-gray-400' />
                            <span className='text-sm text-gray-400'>Daily Challenges</span>
                        </div>
                        <span className='text-sm font-semibold text-white'>{formatNumber(summary?.daily_challenges) || '0'}</span>
                    </div>
                    <div className='flex items-center justify-between p-3 rounded-lg bg-mainBackground/30 border border-gray-700/30 hover:border-navOrange/30 transition-colors'>
                        <div className='flex items-center gap-2'>
                            <Zap className='w-4 h-4 text-gray-400' />
                            <span className='text-sm text-gray-400'>Avg WPM</span>
                        </div>
                        <span className='text-sm font-semibold text-white'>{Math.round(summary?.avg_recent_wpm) || 0}</span>
                    </div>
                    <div className='flex items-center justify-between p-3 rounded-lg bg-mainBackground/30 border border-gray-700/30 hover:border-navOrange/30 transition-colors'>
                        <div className='flex items-center gap-2'>
                            <FileText className='w-4 h-4 text-gray-400' />
                            <span className='text-sm text-gray-400'>Characters</span>
                        </div>
                        <span className='text-sm font-semibold text-white'>{formatNumber(summary?.tot_chars) || '0'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;