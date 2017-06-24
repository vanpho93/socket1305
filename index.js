const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.get('/', (req, res) => res.render('home'));
server.listen(process.env.PORT || 3000, () => console.log('Server started!'));

let arrUser = [];

io.on('connection', socket => {
    socket.on('CLIENT_SIGN_UP', username => {
        const isExist = arrUser.some(e => e.username === username);
        if (isExist) return socket.emit('SERVER_REFUSE');
        const user = new User(socket.id, username);
        socket.emit('SERVER_ACCEPT', arrUser);
        arrUser.push(user);
        io.emit('NEW_USER', user);
    });

    socket.on('CLIENT_SEND_MESSAGE', msg => io.emit('SERVER_SEND_MESSAGE', msg));

    socket.on('disconnect', () => {
        io.emit('USER_DISCONNECT', socket.id);
        arrUser = arrUser.filter(e => e.id !== socket.id);
    });
});

class User {
    constructor(id, username) {
        this.id = id;
        this.username = username;
    }
}

//