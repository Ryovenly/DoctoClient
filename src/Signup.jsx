import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signUp } from "./firebase";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, seterror] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      seterror("Passwords do not match");
    } else {
      setEmail("");
      setPassword("");
      const res = await signUp(email, password);
      if (res.error) seterror(res.error)
    }
  };

const [supportsPWA, setSupportsPWA] = useState(false);
const [promptInstall, setPromptInstall] = useState(null);

useEffect(() => {
    const handler = e => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

// let deferredPrompt;
//     window.addEventListener('beforeinstallprompt', (e) => {
//         deferredPrompt = e;
//     });

//     const installApp = document.getElementById('installApp');
//     installApp.addEventListener('click', async () => {
//         if (deferredPrompt !== null) {
//             deferredPrompt.prompt();
//             const { outcome } = await deferredPrompt.userChoice;
//             if (outcome === 'accepted') {
//                 deferredPrompt = null;
//             }
//         }
//     });

  return (
    <>
    <h1>DoctoClient</h1>
    <button onClick={onClick} id="installApp">Install</button>

      <h2>S'inscrire</h2>
      <div>
        {error ? <div>{error}</div> : null}
        <form className="signupForm" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Mot de passe"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Confirmer Mot de passe"
            required
            onChange={(e) => setPassword2(e.target.value)}
          />
          <button type="submit">Valider</button>
        </form>
        <p>
          Déjà enregistré? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </>
  );
};

export default Signup;