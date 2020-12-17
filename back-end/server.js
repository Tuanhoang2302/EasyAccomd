const express = require('express')
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const http = require('http')
const socketIo = require("socket.io");
const Models = require('./models/index')

require('dotenv').config()
app.use(cors());
app.use(bodyParser.json());

app.use('/user',require('./routers/auth/register'))
app.use('/user',require('./routers/auth/login'))
app.use("/find", require('./routers/getQuery/User'))
app.use("/user", require('./routers/getQuery/Request After Login/registerAccomdation'))
app.use("/user", require('./routers/getQuery/Request After Login/reservation'))
app.use("/", require('./routers/getQuery/Chat/Chat'))
app.use("/comment", require('./routers/getQuery/Comment'))
// app.listen(port, () => {
//     console.log(`Example app listening at ${port}`);
// })

const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});
io.on("connection", (socket) => {
  socket.on("join room", (roomId) => {
    socket.join(roomId)
  })
  //socket.emit("send message", socket.id)
  socket.on("client send message", (data) => {
    console.log(data);
    const message = new Models.Message({
      roomChatId:data.roomId,
      senderId: data.senderId,
      receiverId: data.receiverId,
      content: data.message,
      createdAt: Date.now(),
    })
    message.save().then(() => {
      io.sockets.to(data.roomId).emit("server send message", 
    {message: data.message, senderId: data.senderId})
    })
    
  })
})

mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true});

const db = mongoose.connection;
db.once('open', function(){
  console.log("port is open");
  
});

server.listen(port, ()=> console.log("server has started"))