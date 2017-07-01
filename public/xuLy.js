const socket = io();
let idRemote;

socket.on('SERVER_SEND_MESSAGE', value => {
    $('#listMessage').append(`<li>${value}</li>`)
});

socket.on('SERVER_REFUSE', () => alert('Please choose another username'));
socket.on('SERVER_ACCEPT', arrUser => {
    $('#div-chat').show();
    $('#div-sign-up').hide();
    arrUser.forEach(e => $('#listUser').append(`<li id="user-${e.id}">${e.username}</li>`));
    socket.on('NEW_USER', user => $('#listUser').append(`<li id="user-${user.id}">${user.username}</li>`));
});

socket.on('USER_DISCONNECT', socketId => {
    $(`#user-${socketId}`).remove();
});

$('#div-chat').hide();

function sendText(event) {
    event.preventDefault();
    const msg = $('#txtMessage').val();
    $('#txtMessage').val('')
    socket.emit('CLIENT_SEND_MESSAGE', msg);
}

$('#btnSignUp').click(() => {
    const username = $('#txtUsername').val();
    socket.emit('CLIENT_SIGN_UP', username);
});

$('#listUser').on('click', 'li', function() {
    $('#listUser li').removeClass('active');
    $(this).addClass('active');
    const idAttr = $(this).attr('id');
    idRemote = idAttr.substring(5);
});
