import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

export function useDailyStatus() {
    const [completed, setStatus] = useState(false);
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
            setStatus(result?.completion || false);
        } catch (err) {
            console.error("Error fetching daily challenge status: ", err);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    return { completed, loading };
}