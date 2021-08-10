import React from 'react'; 

interface IAuth{
    signIn : any, 
    signOut: any, 
    signUp: any
}

const defaultValue: IAuth = {
    signIn: () => console.error("attempting to use AuthContext outside of a valid provider"),
    signOut: () => console.error("attempting to use AuthContext outside of a valid provider"),
    signUp: () => console.error("attempting to use AuthContext outside of a valid provider"),
  }  

export const AuthContext = React.createContext<IAuth>(defaultValue)