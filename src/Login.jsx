import { useState } from "react";
import signIn from './handles/handlesubmit';
import SignOut from './handles/handlesubmit';

import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate, Navigate } from "react-router-dom";



   // const auth = getAuth(firebaseApp);

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();
      const navigate = useNavigate();
    const [
      signInWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useSignInWithEmailAndPassword(auth);
  
    if (error) {
      return (
        <div>
          <p>Erreur: {error.message}</p>
        </div>
      );
    }
    if (loading) {
      return <p>Chargement...</p>;
    }
    if (user) {
        return <Navigate replace to="/profile" />;
    //   return (
    //     <div>
    //       <p>Signed In User: {user.user.email}</p>
    //     </div>
    //   );
    }
    return (
      <div className="App">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => signInWithEmailAndPassword(email, password)}>
          Se connecter
        </button>
      </div>
    );
  };

export default Login;