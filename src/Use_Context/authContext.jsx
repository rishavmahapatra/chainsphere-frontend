"use client"
import { createContext,useContext,useState } from "react";
import {  useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{


    const [authUser, setAuthUser] = useState();
    const [userDetails, setuserDetails] = useState()

    useEffect(() => {
        const token  = localStorage.getItem("token");
        const user  = localStorage.getItem("user");
        if(token){
            setAuthUser(token);
            setuserDetails(user);
        }
    }, []);

    return( 
        <AuthContext.Provider value={{authUser, userDetails}}>
            {children} 
        </AuthContext.Provider>
    );
}

export const userAuth = () => useContext(AuthContext)