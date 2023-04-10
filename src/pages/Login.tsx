import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./Home.module.css";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  let navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //console.log(userCredential);
        // setEmail("");
        // setPassword("");
        navigate("/");
      })
      .catch((error) => {
        if (error.message.includes("auth/wrong-password")) {
          setError("The email or password is incorrect.");
          console.log(error);
        } else if (error.message.includes("user-not-found")) {
          setError("Email not found.");
        } else {
          setError(error.message);
        }
      });
  };
  return (
    <div>
      <span className="pageTitle">Login</span>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          className="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter your email"
          required
        />

        <input
          className="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter your password"
          required
        />
        <span className={styles.info}>
          Doesn't have an account? <Link to="/register">Sign up</Link>
        </span>
        <button>Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
