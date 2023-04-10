import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import "./AuthDetails.css";

interface Props {
  authUser: any;
  setAuthUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthDetails = ({ authUser, setAuthUser }: Props) => {
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        console.log(authUser);
      } else {
        setAuthUser(null);
      }
    });
  }, []);

  const logOut = () => {
    signOut(auth).then(() => console.log("sign out sucessful"));
  };

  return (
    <div className="navBar">
      {authUser ? (
        <>
          <p>{`Signed In as (${authUser.email})`}</p>
          <button onClick={logOut}>Log Out</button>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default AuthDetails;
