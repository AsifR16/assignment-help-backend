let input = document.getElementById("msg-input")
let btn = document.getElementById("btn")
let textarea = document.getElementById("all-messages")
let clientId = document.getElementById("client-id")

const socket = io("http://localhost:3000")
socket.on("message-to-superclient",function(payload){
    textarea.innerHTML += payload.id + ":"+payload.message+"\n";
})

btn.addEventListener("click",function(e){
    e.preventDefault()
    const text = input.value;
    const id = clientId.value;
    socket.emit("message-to-client",{id:id,message:text});
})