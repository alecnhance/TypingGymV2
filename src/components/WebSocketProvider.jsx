import React, { createContext, useState, useRef, useEffect } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        const socket = new Websocket('ws://localhost:3000');
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("WebSocket Opened");
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
