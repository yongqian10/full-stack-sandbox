const socket = io('http//localhost:5500');
const messageForm = document.getElementById('send-container');
const messageInput = doucment.getElementById('message-input');

socket.on('char-message', (data) => {
  console.log(data);
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});
