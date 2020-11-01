import React from "react";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../userProvider";

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
      <img src="" alt="" />
      <button type="submit" onClick={signIn}>
        LOGIN
      </button>
    </div>
  );
}

export default Login;
