const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
const publicPath = path.resolve(__dirname, ".", "dist");
app.use(express.static(publicPath));
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    io.emit("new message", data);
  });
});

app.get("*", (req, res) => {
  const filePath = path.join(__dirname, "dist", "index.html");
  return res.sendFile(filePath);
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`server started on ${port}`));
