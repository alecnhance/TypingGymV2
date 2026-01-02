import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

export function useActivity() {
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();
    const fetchActivity = useCallback(async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const res = await fetch('/api/users/me/activity', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (!res.ok) {
                console.error("Fetch activity error: ", res.text);
                return;
            }
            const dataJSON = await res.json();
            setActivity(dataJSON.data);
            console.log("Activity: ", activity);
        } catch (err) {
            console.error("Failed to fetch activity: ", err);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchActivity();
    }, [fetchActivity]);

    return { activity, loading };
}