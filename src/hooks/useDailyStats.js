import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

export function useDailyStats() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    const fetchDailyStats = useCallback(async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const result = await fetch('api/daily/stats', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (!result.ok) {
                console.error("Fetch Daily stats error");
                return;
            }
            const resultData = await result.json();
            const arr = [];
            console.log("resultData.arr", resultData.arr)
            resultData.data.forEach(row => {
                arr.push({
                    range: row.range,
                    count: row.count
                });
            });
            console.log("arr: ", arr);
            setStats(arr);
        } catch (err) {
            console.error("Failed to fetch daily stats: ", err);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchDailyStats();
    }, [fetchDailyStats]);

    return { loading, stats }
}