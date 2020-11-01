import React from "react";
import Login from "./Components/Login";
import Messenger from "./Components/Messenger";
import { useStateValue } from "./userProvider";

function App() {
  const [{ user }] = useStateValue();

  return <div>{user ? <Messenger /> : <Login />}</div>;
}

export default App;
