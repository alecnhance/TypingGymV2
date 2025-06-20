import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useWebSocket } from '../components/WebSocketProvider';

export function useSummary() {
    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();
    const { data: socketData } = useWebSocket();

    const fetchSummary = useCallback(async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const res = await fetch('/api/users/me/summaryStats', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (!res.ok) {
                console.error('Failed to fetch summary: ', res.text);
                return;
            }
            const data = await res.json();
            console.log(data);
            setSummary(data.data);
        } catch (err) {
            console.error("Error fetching summary: ", err);
        } finally {
            setLoading(true);
        }
    }, [getToken]);

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    useEffect(() => {
        if (socketData?.type === 'updateSummary') {
            fetchSummary();
        }
    }, [fetchSummary, socketData]);

    return { summary, loading };
}