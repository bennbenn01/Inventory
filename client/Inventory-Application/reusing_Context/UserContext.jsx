import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children })=> {
    const[userName, setUsername] = useState('');

    return(
        <UserContext.Provider value={{userName, setUsername}}>
            { children }
        </UserContext.Provider>
    );
}

export const useUser = ()=> useContext(UserContext);