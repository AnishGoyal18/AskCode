import React, { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../auth/firebase';
import ReactLoading from 'react-loading';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [loggedInUser, setloggedInUser] = useState('');
    const [pending, setPending] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setloggedInUser(currentUser);
            setPending(false);
        });
    }, []);

    if (pending) {
        return (
            <div className='flex h-screen justify-center items-center'>
                <ReactLoading type='bars' color='gray' />
            </div>
        )
    }

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        signOut(auth);
    }

    return (
        <userAuthContext.Provider value={{ loggedInUser, signUp, logIn, logOut }}>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext);
}