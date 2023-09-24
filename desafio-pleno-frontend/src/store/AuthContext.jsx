import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext();

export default function AuthProvider({children}){

  useEffect(()=>{

    if (localStorage.getItem("_token") !== null) {
      setIsAuthenticated(true)
    }else{
      setIsAuthenticated(false)
    }   

},[]);
     

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return(
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
          {children}
        </AuthContext.Provider>
    )

}