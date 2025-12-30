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
            const result = await fetch('api/users/me/daily', {
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
                // Convert dates to Eastern Time
                const etDates = data.data.map((row) => {
                    const date = new Date(row.ended_at);
                    const etDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
                    return `${etDate.getFullYear()}-${String(etDate.getMonth() + 1).padStart(2, '0')}-${String(etDate.getDate()).padStart(2, '0')}`;
                });
                const newDatesSet = new Set(etDates);
                setDates(newDatesSet);
                // Get today's date in Eastern Time
                const now = new Date();
                const todayET = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
                const todayETString = `${todayET.getFullYear()}-${String(todayET.getMonth() + 1).padStart(2, '0')}-${String(todayET.getDate()).padStart(2, '0')}`;
                if (newDatesSet.has(todayETString)) {
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