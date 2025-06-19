import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const { getToken } = useAuth();
    const { isSignedIn } = useUser();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!isSignedIn) {
                return;
            }
    
            try {
                const token = await getToken();
                const res = await fetch('/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [isSignedIn]);
    return (
        <UserContext.Provider value={userData}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserContext);
}