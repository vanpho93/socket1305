const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.get('/', (req, res) => res.render('home'));
server.listen(process.env.PORT || 3000, () => console.log('Server started!'));

const arrUser = [];

io.on('connection', socket => {
    socket.on('CLIENT_SIGN_UP', username => {
        const isExist = arrUser.some(e => e.username === username);
        if (isExist) return socket.emit('SERVER_REFUSE');
        arrUser.push(new User(socket.id, username));
        socket.emit('SERVER_ACCEPT');
    });

    socket.on('CLIENT_SEND_MESSAGE', msg => io.emit('SERVER_SEND_MESSAGE', msg));
});

class User {
    constructor(id, username) {
        this.id = id;
        this.username = username;
    }
}

//