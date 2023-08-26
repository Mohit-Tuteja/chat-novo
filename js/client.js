const socket=io('http://localhost:8000');
const form=document.getElementById('submit');
const messageInput=document.getElementById('input');
const messageCnt=document.querySelector('.container');
var audio=new Audio('ting_1-47612.mp3');
const append = (message, position)=>{
    const msgEle = document.createElement('div');
    msgEle.innerText=message;
    msgEle.classList.add("message");
    msgEle.classList.add(position);
    messageCnt.append(msgEle);
    if (position=='left'){
        audio.play();
    }
    
}

const naam = prompt("To join, type your name");
socket.emit('new-user-joined',naam);
socket.on('user-joined',naam=>{
    append(`${naam} joined the chat`, 'right');
})
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`, 'left');
})
socket.on('left',naam=>{
    append(`${naam} left the chat`,'right');
})
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';

})
