import { useAuth } from '@clerk/clerk-react';
import { useState, useCallback, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api.js';
import walle from '../assets/wallee.jpg';
import r2d2 from '../assets/r2d2.jpg';
import baymax from '../assets/baymax.jpg';

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
            username: "WALL-E",
            pic_url: walle,
            count: 0
        };

        const defaultUser2 = {
            wpm: 0,
            username: "R2-D2",
            pic_url: r2d2,
            count:0
        }

        const defaultUser3 = {
            wpm: 0,
            username: "Baymax",
            pic_url: baymax,
            count:0
        }
        
        try {
            const token = await getToken();
            const url = `${API_BASE_URL}/api/daily/getDailyLeaders`;
            console.log('[DEBUG] Fetching:', url, '| API_BASE_URL:', API_BASE_URL || '(empty)');
            
            const result = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            
            console.log('[DEBUG] Response status:', result.status, '| Content-Type:', result.headers.get('content-type'));
            
            if (!result.ok) {
                const errorText = await result.text();
                console.error('[DEBUG] Error response:', result.status, errorText.substring(0, 200));
                setFastestTyper(defaultUser);
                setFastestChallenge(defaultUser2);
                setMostPrompts(defaultUser3);
                setLoading(false);
                return;
            }
            
            const contentType = result.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await result.text();
                console.error('[DEBUG] Expected JSON but got:', contentType, '| Response preview:', text.substring(0, 200));
                setFastestTyper(defaultUser);
                setFastestChallenge(defaultUser2);
                setMostPrompts(defaultUser3);
                setLoading(false);
                return;
            }
            
            const resultData = await result.json();
            console.log('[DEBUG] Success! Data received:', resultData);

            
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
            setFastestChallenge(bestChallenge || defaultUser2);
            setMostPrompts(bestUser || defaultUser3);
        } catch (err) {
            console.error("[DEBUG] Fetch error:", err.message, err);
            // On error, use defaults
            setFastestTyper(defaultUser);
            setFastestChallenge(defaultUser2);
            setMostPrompts(defaultUser3);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchDailyLeaders();
    }, [fetchDailyLeaders]);

    return { loading, fastestTyper, fastestChallenge, mostPrompts };
}