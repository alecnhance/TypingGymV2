import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
// import { useWebSocket } from '../components/WebSocketProvider';

export function useKeyAccuracy() {
    const [keyAccuracy, setKeyAccuracy] = useState({});
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();
    // const { data: socketData } = useWebSocket();

    const fetchAccuracy = useCallback(async () => {
        console.log("Fetching key accuracy...");
        setLoading(true);
        try {
            const token = await getToken();
            const res = await fetch('/api/users/me/keyAccuracy', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                console.error("Fetch Accuracy error ", res.text);
                return;
            }
            const data = await res.json();
            const formattedData = data.reduce((acc, { key, accuracy }) => {
                acc[key] = accuracy;
                return acc;
            }, {});
            setKeyAccuracy(formattedData);
        } catch (err) {
            console.error('Failed to fetch key accuracy', err);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        console.log("Use key accuracy");
        fetchAccuracy();
    }, [fetchAccuracy]);

    // useEffect(() => {
    //     if (socketData?.type === 'keyAccuracyUpdated') {
    //         fetchAccuracy();
    //     }
    // }, [socketData, fetchAccuracy]);

    return { keyAccuracy, loading };
};