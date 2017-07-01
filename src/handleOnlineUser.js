const $ = require('jquery');

function handleOnline(socket) {
    socket.on('SERVER_REFUSE', () => alert('Please choose another username')); // eslint-disable-line
    socket.on('SERVER_ACCEPT', arrUser => {
        $('#div-chat').show();
        $('#div-sign-up').hide();
        arrUser.forEach(e => $('#listUser').append(`<li id="user-${e.id}">${e.username}</li>`));
        socket.on('NEW_USER', user => {
            const toAppend = `<li id="user-${user.id}">${user.username}</li>`;
            $('#listUser').append(toAppend);
        });
    });

    socket.on('USER_DISCONNECT', socketId => {
        $(`#user-${socketId}`).remove();
    });
}

module.exports = handleOnline;
