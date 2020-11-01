import React from "react";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../userProvider";
import "./Login.css";

function Login() {
  // eslint-disable-next-line
  const [{ _ }, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });

        console.log(result.user);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <img
        className="login__logo"
        src="https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png"
        alt="loginlogo"
      />
      <button className="login__button" type="submit" onClick={signIn}>
        Login
      </button>
    </div>
  );
}

export default Login;
