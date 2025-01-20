const socket = io('http://your-backend-url'); // Update with your backend URL

let roomCode = '';
let username = '';

function createRoom() {
    roomCode = document.getElementById('room').value;
    username = document.getElementById('username').value;

    socket.emit('create_room', { room: roomCode });
}

function joinRoom() {
    roomCode = document.getElementById('room').value;
    username = document.getElementById('username').value;

    socket.emit('join_room', { room: roomCode, username: username });
}

function makeChoice(choice) {
    socket.emit('make_choice', { room: roomCode, username: username, choice: choice });
}

socket.on('room_created', (data) => {
    alert(`Room ${data.room} created! Share this with your friend.`);
});

socket.on('player_joined', (data) => {
    document.getElementById('players').innerText = `Players: ${data.players.join(', ')}`;
    document.getElementById('choices').classList.remove('hidden');
});

socket.on('game_result', (data) => {
    document.getElementById('result').innerText = `Result: ${data.result}`;
    document.getElementById('choices').classList.add('hidden');
});
