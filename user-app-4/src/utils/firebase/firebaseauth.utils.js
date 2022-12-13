import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"
import { getStorage } from "firebase/storage";
import {collection, addDoc, Timestamp,where, getFirestore, doc, getDoc, setDoc,query, getDocs} from 'firebase/firestore'

import "./firebase.utils.js";

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = async () => {
 const res = await signInWithPopup(auth, provider);
  const user = res.user;
  const q = query(collection(db, "Users"), where("uid", "==", user.uid));
  const docs = await getDocs(q);
  if (docs.docs.length === 0) {
    await userAddToDb(res);
  }
 return res;
 // console.log('this is the response', res);
};

export const db = getFirestore();

export const storage = getStorage();

export const createUserFromAuth = async (authUser, additionalInfo = {}) => {
  if (!authUser) return;

  const userRef = doc(db, "Users", authUser.uid);

  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = authUser;

    try {
      await setDoc(userRef, {
        displayName,
        email,
        uid: authUser.uid,
        role: chooseRole("USER"),
        createdAt: new Date(),
        ...additionalInfo,
      });
    } catch (error) {
      console.error("error creating data!", error);
    }
  }

  return userRef;
};

export const createUserFromEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserFromEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await auth.signOut();
};

export const onAuthStateChangedListner = (callback) =>{
  onAuthStateChanged(auth, callback);

}

async function userAddToDb(credential) {

  if(credential.user){
    const newUser = credential.user;
    try{
      await addDoc(collection(db, 'Users'), {
        email: newUser.email,
        displayName: newUser.displayName,
        uid: newUser.uid,
        role: chooseRole("USER"),
        createdAt: new Date()
      })
    }catch  (e) {
      console.debug('error', e);
    }
  }
}

function chooseRole(roles){
  const  role = {
    ADMIN : roles == "ADMIN" ? true : false,
    MARKETING_ANALYSIST : roles == "MARKETING_ANALYSIST" ? true : false,
    BLOCK_ADMIN : roles == "BLOCK_ADMIN" ? true : false,
    USER : roles == "USER" ? true : false,
  }
  return role;
}
