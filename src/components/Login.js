import { useEffect, useState } from "react";
import { signInWithGoogle, logout } from "../auth";
import { firebaseApp } from "../App";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Login(props) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [user, loading, error] = useAuthState(auth);
  return (
    <div>
      {/* <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        /> */}
      <button className="login__btn login__google" onClick={signInWithGoogle}>
        Login with Google
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Login;
