import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

import { getAnalytics } from "firebase/analytics";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID
}
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const auth = getAuth();

export default app;

const analytics = getAnalytics(app);

export const signUp = async (email, password) => {
  try {
      const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
      );
      const user = userCredential.user;
      await addDoc(collection(db, "users"), {
          uid: user.uid,
          email: user.email,
      });
      return true
  } catch (error) {
      return { error: error.message }
  }
};
