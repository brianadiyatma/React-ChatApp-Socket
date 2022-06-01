import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatBubbleOther from "./Components/ChatBubbleOther";
import ChatBubbleUser from "./Components/ChatBubbleUser";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  //Create styled component for chat app

  const ChatHeader = styled.div`
    padding: 10px;
    color: #fff;
    background-color: #4caf50;
    font-size: 20px;
    width: 100%;
  `;
  const SendButton = styled.button`
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
  `;
  const ScrollableMessageList = styled.div`
    height: calc(60vh - 100px);
    overflow-y: scroll;
    padding: 10px;
    background-color: #f5f5f5;
  `;

  return (
    <div className="chat-container">
      <div>
        <ChatHeader>
          <p>Live Chat</p>
        </ChatHeader>
        <ScrollableMessageList className="chat-body">
          {messageList.map((messageContent, i) => {
            console.log(messageContent.author === username);
            if (messageContent.author === username) {
              return (
                <ChatBubbleUser
                  key={i}
                  author={messageContent.author}
                  message={messageContent.message}
                  time={messageContent.time}
                />
              );
            } else {
              console.log("else block");
              return (
                <ChatBubbleOther
                  key={i}
                  author={messageContent.author}
                  message={messageContent.message}
                  time={messageContent.time}
                />
              );
            }
          })}
        </ScrollableMessageList>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            className="chat-input"
            placeholder="Say Hello"
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <SendButton onClick={sendMessage}>&#9658;</SendButton>
        </div>
      </div>
    </div>
  );
}

export default Chat;
