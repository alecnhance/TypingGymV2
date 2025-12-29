import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

export function useDailyStatus() {
    const [completed, setCompleted] = useState(false);
    const [dates, setDates] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [wpm, setWpm] = useState(0);
    const { getToken } = useAuth();

    const fetchStatus = useCallback(async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const result = await fetch('api/users/me/dailyChallenge', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (!result.ok) {
                console.error("Fetch daily challenge status error");
                return;
            }
            const data = await result.json();
            if (data?.rows === false) {
                setCompleted(false);
                setDates(new Set());
                return;
            } else {
                const utcDates = data.data.map((row) => {
                    const date = new Date(row.ended_at);
                    return date.toISOString().split('T')[0];
                });
                const newDatesSet = new Set(utcDates);
                setDates(newDatesSet);
                const todayUTC = new Date().toISOString().split('T')[0];
                if (newDatesSet.has(todayUTC)) {
                    setCompleted(true);
                    setWpm(data.data[0].wpm);
                }
            }
            
        } catch (err) {
            console.error("Error fetching daily challenge status: ", err);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    return { completed, loading, dates, wpm };
}