/** User Context to Store User Data Across Page */
import { createContext, useState, useEffect } from "react";

// Create context
export const UserContext = createContext();

// UserContext Provider
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser !== null ? JSON.parse(storedUser) : {"user" : null};
    });

    // Save user info in sessionStorage
    useEffect(() => {
        if (user.id)
        {
            sessionStorage.setItem("user", JSON.stringify(user));
        }
        else
        {
            sessionStorage.removeItem("user");
        }
    }, [user]);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};