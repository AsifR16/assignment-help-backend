const { Server } = require("socket.io");

const io = new Server({
    cors: {
        origin: ['null','*'],
        methods: ['GET', 'POST'],
      }
});

io.on("connection", (socket) => {
    console.log('A user connected');

    socket.on("message-from-client",function(payload){
        io.emit("message-to-superclient",{id:payload.id,message:payload.message})
    })
    socket.on("message-to-client",function(payload){
        socket.to(payload.id).emit("message-from-server",{id:payload.id,message:payload.message})
    })
    socket.on("disconnect",function(){
        console.log("User disconnected")
    })
});
console.log("IO Server running on 3000");
io.listen(3000)