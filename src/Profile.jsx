import { useContext,useState,useEffect } from "react";
//import AuthContext from "./AuthContext";
import * as React from 'react';
import { useNavigate, Navigate } from "react-router-dom";
//import signOut from './handles/handlesubmit';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs,getDoc , setDoc, doc  } from "firebase/firestore";
//import Signout from "./handles/Signout";
import {firestore} from './firebase';
import {patientConverter} from './Patient';

function notifyMe(message) {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification(message);
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification(message);
        // …
      }
    });
  }
}
  
const logout = () => {
    const auth = getAuth();
    notifyMe("Deconnexion");
    signOut(auth);
  };


const Profile = () => {
  //const { user } = useContext(AuthContext);
  const navigate = useNavigate();

const [doctor, setDoctor] = useState("");
const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");
const [city, setCity] = useState("");
const [adresse, setAdresse] = useState("");
//const [user, setUser] = useState("");

const ToDoctorPage = () => {
  navigate("/doctor");
};

const [user, setUser] = useState({});


  useEffect(() => {

    currentData();

  }, [])

const currentData = async () => {

  try {

    const auth = getAuth();
    const currentUser = auth.currentUser.uid;
    const docRef = doc(firestore,"Patients", currentUser).withConverter(patientConverter)
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        console.log(docSnap.data());
        const patient = docSnap.data();
        setAdresse(patient.adresse);
        setCity(patient.city);
        setFirstname(patient.firstname);
        setLastname(patient.lastname);
    } else {
        console.log("Document does not exist")
    }

} catch(error) {
    console.log(error)
}


}

const addPatient = async (e) => {
  e.preventDefault();  
  const auth = getAuth();
  try {
      const docRef = await setDoc(doc(firestore, "Patients",auth.currentUser.uid), {
        firstname: firstname,   
        lastname: lastname, 
        city: city,
        adresse: adresse
      });
      console.log("Patient bien ajouté: ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}


const updateDoctor = async (e) => {
    e.preventDefault();  
   
    try {
        const docRef = await addDoc(collection(firestore, "Doctors"), {
          firstName: firstName,   
          lastName: lastName, 
          city: city,  
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

  return (
    <>
      <h1>Vos données</h1>


        <form className="signupForm" onSubmit={addPatient}>
          <input
            type="name"
            name="firstname"
            value={firstname}
            placeholder="Prénom"
            required
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="name"
            name="lastname"
            value={lastname}
            placeholder="Nom"
            required
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="name"
            name="city"
            value={city}
            placeholder="Ville"
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="name"
            name="adresse"
            value={adresse}
            placeholder="Adresse"
            required
            onChange={(e) => setAdresse(e.target.value)}
          />
          <button type="submit">Valider</button>
        </form>


<button onClick={ToDoctorPage}>Voir les docteurs</button>

 <button onClick={logout}>Se déconnecter</button>
    </>
  );
};

export default Profile;