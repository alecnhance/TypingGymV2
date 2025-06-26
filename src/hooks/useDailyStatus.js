import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

export function useDailyStatus() {
    const [completed, setCompleted] = useState(false);
    const [dates, setDates] = useState(new Set());
    const [loading, setLoading] = useState(true);
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
                const utcDates = data.formData.map((row) => {
                    const date = new Date(row.ended_at);
                    return date.toISOString().split('T')[0];
                });
                setDates(new Set(utcDates));
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

    return { completed, loading, dates };
}