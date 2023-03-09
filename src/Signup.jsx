import { useState } from "react";
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

  return (
    <>
    <h1>DoctoClient</h1>

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