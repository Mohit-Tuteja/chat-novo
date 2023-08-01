const socket=io('http://localhost:8000');
const form=document.getElementById('submit');
const messageInput=document.getElementById('input');
const messageCnt=document.querySelector('.container');
const append = (message, position)=>{
    const msgEle = document.createElement('div');
    msgEle.innerText=message;
    msgEle.classList.add('message');
    msgEle.classList.add(position);
    messageCnt.append(msgEle);
    
}

const name = prompt("To join, type your name");
socket.emit('new-user-joined',name);
socket.on('user-joined',data=>{
    append(`${name} joined the chat`, 'right');
})
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`, 'left');
})
socket.on('left',name=>{
    append(`${name} left the chat`,'right');
})
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';

})
