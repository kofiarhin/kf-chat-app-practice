import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("https://kf-chat-app-practice.onrender.com/");

const App = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.on("new message", (data) => {
      setMessage(data.message);
    });
  }, [socket]);

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("send_message", { message: inputMessage, user: "kofi arhin" });

    setInputMessage("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          placeholder="Enter message here...."
          onChange={handleChange}
          value={inputMessage}
        />
        <button>Send Messsae</button>
      </form>
      {message && <h2> {message} </h2>}
    </div>
  );
};
export default App;
