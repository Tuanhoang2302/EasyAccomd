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
app.use(bodyParser.json({limit: '50mb'}));

app.use('/auth',require('./routers/auth/register'))
app.use('/auth',require('./routers/auth/login'))
app.use("/find", require('./routers/getQuery/User'))
app.use("/user", require('./routers/getQuery/Request After Login/registerAccomdation'))
app.use("/user", require('./routers/getQuery/Request After Login/reservation'))
app.use("/", require('./routers/getQuery/Chat/Chat'))
app.use("/comment", require('./routers/getQuery/Comment'))
app.use("/favorite", require('./routers/getQuery/Favorite'))
app.use("/accomodation", require('./routers/getQuery/Accomdation'))
app.use("/notification", require('./routers/getQuery/Notification'))
app.use("/fake", require('./routers/Fake Data/Accomodation'))
app.use("/fake", require('./routers/Fake Data/User'))
app.use("/usermanage", require('./routers/getQuery/Owner'))
app.use("/rentermanage", require('./routers/getQuery/Renter'))
app.use("/adminManage", require('./routers/getQuery/Admin'))
// app.listen(port, () => {
//     console.log(`Example app listening at ${port}`);
// })
const test = require('./routers/Fake Data/Constant Data/image')
console.log(test[0]);
var userOnline ={}
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
    const message = new Models.Message({
      roomChatId:data.roomId,
      senderId: data.senderId,
      receiverId: data.receiverId,
      content: data.message,
      createdAt: Date.now(),
    })
    message.save().then(() => {
      Models.RoomChat.where({
        _id: data.roomId
      }).update({
        lastMessage: data.message
      }).then((upd) => {
        io.sockets.to(data.roomId).emit("server send message", 
        {message: data.message, senderId: data.senderId})
      })
      
    })
  })
  socket.on("first time", (data) => {
    userOnline[data.email] = socket.id
  })
  socket.on("client send notification", async (data) => {
    console.log(data);
    const noti = new Models.Notification({
       senderId: data.account,
       senderEmail: data.senderEmail,
       type: data.type,
       createdAt: Date.now(),
       receiverId: mongoose.Types.ObjectId(data.receiverId),
       accomId: data.accom,
       isChecked: false
    })
    noti.save().then((notiData) => {
      io.to(userOnline[data.senderEmail])
      .emit("server send notification to admin", notiData)
    })
  })
})

mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true});

const db = mongoose.connection;
db.once('open', function(){
  console.log("port is open");
  
});

server.listen(port, ()=> console.log("server has started"))