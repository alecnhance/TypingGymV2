import React, { createContext, useState, useRef, useEffect, useContext } from 'react';
import { useUser } from '@clerk/clerk-react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const socketRef = useRef(null);
    const { user } = useUser();

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000');
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("WebSocket Opened");

            if (user?.id) {
                socket.send(JSON.stringify({ type: 'register', clerkId: user.id }));
            }
        }

        socket.onclose = () => {
            console.log("Websocket closed");
        }

        socket.onMessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("Message received:", message);
            setData(message);
        }

        socket.onError = (error) => {
            console.error("Socket error:", error)
        }

        return () => {
            socket.close();
        }
    }, []);

    return (
        <WebSocketContext.Provider value={{ data, socket: socketRef.current }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
