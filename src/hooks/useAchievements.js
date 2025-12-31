import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

export function useAchievements() {
    const [loading, setLoading] = useState(true);
    const [achievements, setAchievements] = useState(null);
    const { getToken } = useAuth();
    const fetchAchievements = useCallback(async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const result = await fetch('api/users/me/achievements', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!result.ok) {
                console.error("Error getting achievements");
                return;
            }
            const resultJSON = await result.json();
            setAchievements(resultJSON.data);
        } catch (err) {
            console.error("Failed to fetch achievements: ", err);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchAchievements();
    }, [fetchAchievements]);

    return { loading, achievements };
}