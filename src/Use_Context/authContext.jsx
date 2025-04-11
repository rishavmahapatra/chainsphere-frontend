"use client"
import { createContext,useContext,useState } from "react";
import {  useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{


    const [authUser, setAuthUser] = useState(null);
    const [userDetails, setuserDetails] = useState(null)

    useEffect(() => {
        const token  = localStorage.getItem("token");
        const user  = localStorage.getItem("user");
        if(token && user){
            setAuthUser(token);
            setuserDetails(user);
        }
    }, [localStorage.getItem("token")]);

    return( 
        <AuthContext.Provider value={{authUser, userDetails,setAuthUser,setuserDetails}}>
            {children} 
        </AuthContext.Provider>
    );
}

export const userAuth = () => useContext(AuthContext)