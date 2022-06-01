import React from "react";

import "./ChatBubbleOther.module.css";

const ChatBubbleOther = (props) => {
  return (
    <div className="chat-bubble">
      <p
        style={{
          fontSize: "15px",
          color: "black",
          fontWeight: "bold",
          margin: "0",
        }}
      >
        {props.author}
      </p>
      <div>
        <p
          style={{
            fontSize: "15px",
            color: "black",
            margin: "0",
            textAlign: "left",
          }}
        >
          {props.message}
        </p>
      </div>
      <div>
        <p
          style={{
            fontSize: "10px",
            color: "grey",
            margin: "0",
            textAlign: "right",
          }}
        >
          {props.time}
        </p>
      </div>
    </div>
  );
};

export default ChatBubbleOther;
