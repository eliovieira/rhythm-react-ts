import { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";

interface Props {
  setAuthUser: React.Dispatch<React.SetStateAction<any>>;
}

const Navbar = ({ setAuthUser }: Props) => {
  const authUser = useContext<any>(LoginContext);
  console.log(authUser);
  let navigate = useNavigate();
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        //console.log(authUser);
      } else {
        setAuthUser(null);
      }
    });
  }, []);

  const logOut = () => {
    signOut(auth).then(() => {
      //console.log("sign out sucessful");
      navigate("/");
    });
  };

  return (
    <div className="container">
      <nav className={styles.navbar}>
        <NavLink to="/">
          <span className={styles.logo}>Rhythm</span>
        </NavLink>
        <div className={styles.menu}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>

          {!authUser && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Sign In
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Sign Up
              </NavLink>
            </>
          )}

          {authUser && (
            <>
              <li>
                <NavLink
                  to="/myposts"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  My Beats
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/newblog"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  New Post
                </NavLink>
              </li>
              <li>
                <span className={styles.userInfo}>
                  <p>Welcome</p>
                  <p> {authUser && authUser.email}</p>
                  <button onClick={logOut} className={styles.logoutBtn}>
                    Log Out
                  </button>
                </span>
                {/* <p>{`Signed In as (${authUser.email})`}</p> */}
              </li>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
