import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
// import { useWebSocket } from '../components/WebSocketProvider';


export function useWPMGraph() {
    const [graph, setGraph] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();
    // const { data: socketData } = useWebSocket();

    const fetchGraph = useCallback(async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const res = await fetch('/api/users/me/wpmGraph', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                console.error("Fetch graph error: ", res.text);
                return;
            }
            const data = await res.json();
            const formattedData = data.data.reduce((acc, { day, wpm }) => {
                acc.push({ x: day, y: wpm });
                return acc;
            }, [])
            setGraph(formattedData);
        } catch (err) {
            console.error("Error fetching graph data: ", err);
        } finally {
            setLoading(false);
        }
    }, [getToken]);

    useEffect(() => {
        fetchGraph();
    }, [fetchGraph]);

    return { graph, loading };
}