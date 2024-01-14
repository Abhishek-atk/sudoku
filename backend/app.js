const route = require("./router/route");
const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});
app.use("/", route);
let clientNo = 0;
let roomNo;

io.on("connection", (socket) => {
  socket.on("connectGame", function (data) {
    clientNo++;
    roomNo = Math.round(clientNo / 2);
    socket.join(roomNo);
    socket.emit("serverMsg", {
      clientNo: clientNo,
      roomNo: roomNo,
    });
  });

  socket.on("disconnect", () => {
    if (clientNo === 0) {
      clientNo = 0;
    } else {
      clientNo--;
    }
  });
  socket.on("endGameWin", (arg) => {
    io.to(arg).emit("winResult");
  });
  socket.on("endGameLose", (arg) => {
    io.to(arg).emit("mistakeWinResult");
  });
  socket.on("connectingOpponent", (arg) => {
    if (clientNo % 2 === 0) {
      io.to(arg).emit("opponentConnectionDone");
    }
  });

socket.on("getProgress", ({ progressData }) => {
  const senderSocketId = socket.id;
  io.to(progressData.room).emit("setProgress", {
    ...progressData,
    senderSocketId,
  });
});
  socket.on("exitGame", (arg) => {
    io.to(arg).emit("getExitGame")
  });

});
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
