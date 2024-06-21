import React, {createContext, useState,useEffect, useContext} from "react";
const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user'));
    });

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => {
    return useContext(UserContext);
}
