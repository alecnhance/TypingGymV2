import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useWebSocket } from '../components/WebSocketProvider';

export function usePracticeDates() {
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();
    const { data: socketData } = useWebSocket();

    const fetchDates = useCallback(async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const res = await fetch('/api/users/me/dates', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                console.error("Fetch Dates returned error: ", err);
                return;
            }
            const data = await res.json();
            const formattedData = data.data.map(row => new Date(row.date));
            console.log("Practice Dates set");
            setDates(formattedData);
        } catch (err) {
            console.error("Failed to fetch dates: ", err);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchDates();
    }, [fetchDates]);

    useEffect(() => {
        if (socketData?.type === 'datesUpdated') {
            fetchDates();
        }
    }, [fetchDates, socketData]);

    return { loading, dates }
}