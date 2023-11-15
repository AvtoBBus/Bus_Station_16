import { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
    const [{ userName, auth }, setUser] = useState({ userName: "", auth: false });


    const signIn = (newAuth, callBack) => {
        setUser(newAuth);
        callBack();
    }

    const signOut = (callBack) => {
        setUser(false);
        callBack();
    }
    const user = { userName, auth };
    const value = { user, signIn, signOut };


    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}