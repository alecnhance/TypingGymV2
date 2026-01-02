import { useState, useCallback, useEffect } from 'react';

export function useUsage() {
    const [usage, setUsage] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUsage = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/site/usage', {
                method: 'GET',
            });
            if (!res.ok) {
                console.error("Failed to fetch usage: ", res.text);
                return;
            }
            const resJSON = await res.json();
            setUsage(resJSON.data);
            console.log("Usage: ", resJSON.data);
        } catch (err) {
            console.error("Failed to fetch usage: ", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsage();
    }, [fetchUsage]);
    
    return { usage, loading };
}