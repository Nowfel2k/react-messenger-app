import React, { forwardRef } from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import "./Message.css";

const Message = forwardRef(({ username, message }, ref) => {
  const isUser = username === message?.username;
  return (
    <div ref={ref} className={`message ${isUser && "message__user"} `}>
      <p className="message__profileName">
        {!isUser && `${message?.username || "User"} `}
      </p>
      <div className="message__container">
        <Card className={isUser ? "message__userCard" : "message__guestCard"}>
          <CardContent>
            <Typography color="white" variant="p" component="h3">
              {message.message}
            </Typography>
          </CardContent>
        </Card>
        <img
          className={`message__profileImage ${
            isUser ? "image_user" : "image_guest"
          }`}
          src={message?.photoURL}
          alt=""
        />
      </div>
    </div>
  );
});

export default Message;
