import React, { useState, useEffect } from "react";
import "./Messenger.css";
import { FormControl, Input } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Message from "./Message";
import db from "../firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import { IconButton } from "@material-ui/core";
import { useStateValue } from "../userProvider";

function Messenger() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [{ user }] = useStateValue();

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            message: doc.data(),
            photoURL: doc?.photoURL,
          }))
        );
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("messages").add({
      message: input,
      username: user.displayName,
      photoURL: user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      //serverTimezone which location we selected to host our database
    });
    setInput("");
  };

  return (
    <div className="messenger">
      <div className="messenger__header">
        <img
          alt="messengerlogo"
          src="https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png"
        />
        <h3>
          Messenger Clone{" "}
          <span role="img" aria-label={"rocket"}>
            🚀
          </span>
        </h3>
        <h4>Welcome {user.displayName}! </h4>
      </div>

      <form className="messenger__form">
        <FormControl className="messenger__formControl">
          <Input
            className="messenger__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
            className="messenger__iconButton"
            disabled={!input}
            onClick={sendMessage}
            type="submit"
            color="primary"
            variant="contained"
          >
            <SendIcon />
          </IconButton>

          {/* <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SendIcon></SendIcon>}
                type="submit"
                disabled={!input}
                onClick={sendMessage}
              >
              </Button> */}
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={user.displayName} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default Messenger;
