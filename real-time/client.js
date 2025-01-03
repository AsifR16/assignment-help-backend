let input = document.getElementById("msg-input")
let btn = document.getElementById("btn")
let textarea = document.getElementById("all-messages")
const socket = io("http://localhost:3000")

socket.on("message-from-server",function(payload){
    textarea.innerHTML += payload.message+"\n";
})

btn.addEventListener("click",function(e){
    e.preventDefault()
    const text = input.value;
    textarea.innerHTML += text+'\n';
    socket.emit("message-from-client",{id:socket.id,message:text});
})