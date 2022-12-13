import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
    sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../utils/firebase/firebase.utils";
import {db} from '../utils/firebase/firebase.utils'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
        function logIn(email, password) {
        const newEmail = `${email}`+`@gmail.com`
    return signInWithEmailAndPassword(auth, newEmail, password);
  }
 async function signUp(email, password) {
     const usersCollectionRef = collection(db, 'Admin');

     try {
         const newEmail = `${email}`+`@gmail.com`
         const res = await  createUserWithEmailAndPassword(auth, newEmail, password);
         console.log('signup res', res);

         if(res.user){
             console.log('print result inseide if')
             try{
                 await addDoc(collection(db, 'Admin'), {
                     email: newEmail,
                     userName: email,
                     id: auth.currentUser.uid,
                     role: "Admin",
                 })
             }catch  (e) {
                 console.debug('error is here   ', e);
             }
         }
         return true;
     }
     catch (e) {
         console.debug('error', e);
     }
  }
  function chooseRole(roles){
            const  role = {
                ADMIN : roles == "ADMIN" ? true : false,
                MARKETING_ANALYSIST : roles == "MARKETING_ANALYSIST" ? true : false,
                BLOCK_ADMIN : roles == "BLOCK_ADMIN" ? true : false
            }
            return role;
  }
    async function addAdmin(username, email, password, role) {
        const usersCollectionRef = collection(db, 'Admin');

        try {
            const newEmail = `${username}`+`@gmail.com`
            const res = await  createUserWithEmailAndPassword(auth, newEmail, password);
            console.log('signup res', res);

            if(res.user){
                console.log('add admin')
                try{
                    await addDoc(collection(db, 'Admin'), {
                        email: email,
                        userName: username,
                        uid: auth.currentUser.uid,
                        role: chooseRole(role),
                    })
                }catch  (e) {
                    console.debug('error white add admin', e);
                }
            }
            return true;
        }
        catch (e) {
            console.debug('error', e);
        }
    }
 async function logOut() {
   return  await signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

    const triggerResetEmail = async (email) => {
        const newEmail = `${email}`+`@gmail.com`
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent")
    }

    const loginWithEmailAndPassword = async (email, password) => {
        if (!email || !password) return;

        return await signInWithEmailAndPassword(auth, email, password);
    };

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn,addAdmin ,triggerResetEmail, loginWithEmailAndPassword}}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
