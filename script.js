// script.js
const loginPage = document.getElementById('login-page');
const chatPage = document.getElementById('chat-page');
const usernameInput = document.getElementById('username');
const joinChatButton = document.getElementById('join-chat');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendMessageButton = document.getElementById('send-message');

let username = '';
const socket = io(); // Socket.io ile bağlantı

joinChatButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        socket.emit('join', username);
        loginPage.style.display = 'none';
        chatPage.style.display = 'block';
    }
});

sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('message', { username, message });
        messageInput.value = '';
    }
});

socket.on('message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.username}: ${data.message}`;
    messagesDiv.appendChild(messageElement);
});
