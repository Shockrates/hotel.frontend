import { createContext, useContext, useState } from "react";
import { IUserState, User } from "../types";
import apiClient from "../lib/apiClient";

const AuthContent = createContext<IUserState>({
    user: null,
    setUserToLocalStorage: (_user: User) => {},
    csrfToken: () => {}
});


export const AuthProvider = ( { children }: { children: React.ReactNode } ) => {

    const [user, setUser] = useState<User>(
        JSON.parse(localStorage.getItem('user') !) || null
    )

    // set user to local storage
    const setUserToLocalStorage = (user: User) => {
        
        if (user) {
            
            localStorage.setItem('user', JSON.stringify(user)); 
        } else {
            localStorage.removeItem('user')
        }
        setUser(user);
    }

    // csrf token generation for guest methods
    const csrfToken = async() => {

        
        await apiClient.get('/sanctum/csrf-cookie');
        
        return true
    }

    return (
        <AuthContent.Provider value={ {user, setUserToLocalStorage, csrfToken}}>
            {children}
        </AuthContent.Provider>
    );

    
};

export const useAuth = () => {
    return useContext(AuthContent)
}