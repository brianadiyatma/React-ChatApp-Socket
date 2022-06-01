import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import "./globals.css";
import styled from "@emotion/styled";

const socket = io.connect("http://localhost:8000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const JoinButton = styled.button`
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
  `;

  const inputStyle = {
    border: "1px solid #4caf50",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
  };
  const Title = styled.h1`
    color: #4caf50;
  `;

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <Title>Join A Chat</Title>
          <input
            type="text"
            style={inputStyle}
            placeholder="John..."
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            style={inputStyle}
            placeholder="Room ID..."
            value={room}
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <JoinButton onClick={joinRoom}>Join A Room</JoinButton>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
