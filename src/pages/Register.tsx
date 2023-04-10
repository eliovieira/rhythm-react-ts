import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const [sucess, setSucess] = useState<string>("");
  let navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords must match. Please try again.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        //sendEmailVerification(userCredential.user);
        setError(null);
        setSucess("Please confirm your email.");
      })
      .catch((error) => {
        if (error.message.includes("auth/email-already-in-use")) {
          setError("Email already exists.");
        } else if (error.message.includes("weak-password")) {
          setError("Password must contain at least 6 characters.");
        } else {
          setError(error.message);
        }
      });
  };

  const handleReset = () => {
    console.log("oi");
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        console.log(userCredential);
        setError(null);
        setSucess("Please confirm your email.");
      })
      .catch((error) => {
        //console.log(error);
        setError(error.message);
      });
  };

  return (
    <>
      <span className="pageTitle">Register</span>
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
          placeholder="Enter a password"
          required
        />

        <input
          className="password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          placeholder="Confirm a password"
          required
        />
        <span className={styles.info}>
          Already have an account? <Link to="/login">Sign in</Link>
        </span>
        <button>Register</button>

        {/* <button onClick={signInWithGoogle}>Sign Up with Google</button> */}
        {error && <div className="error">{error}</div>}
        {sucess && <div className="sucess">{sucess}</div>}
      </form>
    </>
  );
};

export default Register;
