import { useAuth } from '@clerk/clerk-react';
import { useState, useCallback, useEffect } from 'react';
import blankProfile from '../assets/blank-profile.jpg';

export function useDailyLeaders() {
    const [loading, setLoading] = useState(true);
    const [fastestTyper, setFastestTyper] = useState(null);
    const [fastestChallenge, setFastestChallenge] = useState(null);
    const [mostPrompts, setMostPrompts] = useState(null);
    const { getToken } = useAuth();

    const fetchDailyLeaders = useCallback(async () => {
        setLoading(true)
        
        // Default fallback object
        const defaultUser = {
            wpm: 0,
            username: "username",
            pic_url: blankProfile,
            count: 0
        };
        
        try {
            const token = await getToken();
            const result = await fetch('api/daily/getDailyLeaders', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (!result.ok) {
                // If 404 or other error, use defaults
                console.error("Fetch Daily Leaders error");
                setFastestTyper(defaultUser);
                setFastestChallenge(defaultUser);
                setMostPrompts(defaultUser);
                setLoading(false);
                return;
            }
            const resultData = await result.json();

            
            let bestPrompt = null;
            let bestPromptWPM = 0;
            let bestChallenge = null;
            let bestChallengeWPM = 0;
            let users = {};
            let bestUser = null;
            resultData.data.forEach(row => {
                // Handle both isDaily (camelCase) and isdaily (lowercase) from database
                const isDaily = row.isDaily || row.isdaily || false;
                if (isDaily === true || isDaily === 'true' || isDaily === 1) {
                    if (row.wpm > bestChallengeWPM) {
                        bestChallengeWPM = row.wpm;
                        bestChallenge = row;
                    }
                } else {
                    if (row.wpm > bestPromptWPM) {
                        bestPromptWPM = row.wpm;
                        bestPrompt = row;
                    }
                }
                if (!users[row.user_id]) {
                    users[row.user_id] = {
                        username: row.username,
                        pic_url: row.pic_url,
                        count: 1
                    }
                } else {
                    users[row.user_id].count++;
                }
                if (!bestUser) {
                    bestUser = users[row.user_id];
                } else if (users[row.user_id].count > bestUser.count) {
                    bestUser = users[row.user_id];
                }
            });
            // Use defaults if no data found
            setFastestTyper(bestPrompt || defaultUser);
            setFastestChallenge(bestChallenge || defaultUser);
            setMostPrompts(bestUser || defaultUser);
        } catch (err) {
            console.error("Failed to fetch daily leaders: ", err);
            // On error, use defaults
            setFastestTyper(defaultUser);
            setFastestChallenge(defaultUser);
            setMostPrompts(defaultUser);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchDailyLeaders();
    }, [fetchDailyLeaders]);

    return { loading, fastestTyper, fastestChallenge, mostPrompts };
}