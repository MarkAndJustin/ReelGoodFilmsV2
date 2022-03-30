import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, 
        onAuthStateChanged, 
        signInWithEmailAndPassword,
        sendPasswordResetEmail,
        signOut, updateEmail, updatePassword} from 'firebase/auth';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setIsLoggedIn(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        setIsLoggedIn(false)
        return signOut(auth)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const updateEmailHandler = (email) => {
        return updateEmail(auth.currentUser, email)
    }

    const updatePasswordHandler = (password) => {
        return updatePassword(auth.currentUser, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false)
        });

        return unsubscribe
    }, [])


    const value = {
        currentUser,
        isLoggedIn,  
        signUp,
        login,
        logout,
        resetPassword,
        updateEmailHandler, 
        updatePasswordHandler,     
    }

    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

