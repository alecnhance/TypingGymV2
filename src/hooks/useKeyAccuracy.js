import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

export function useKeyAccuracy() {
    const [keyAccuracy, setKeyAccuracy] = useState({});
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchAccuracy = async () => {
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
                    console.error("Fetch Accuracy response 401: ", res.text);
                    return;
                }
                const data = await res.json();
                console.log(data);
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
        };
        console.log("Use key accuracy");
        fetchAccuracy();
    }, [getToken]);

    return { keyAccuracy, loading };
};