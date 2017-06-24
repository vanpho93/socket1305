const socket = io();
socket.on('SERVER_SEND_MESSAGE', value => {
    $('#listMessage').append(`<li>${value}</li>`)
});

socket.on('SERVER_REFUSE', () => alert('Please choose another username'));
socket.on('SERVER_ACCEPT', () => {
    $('#div-chat').show();
    $('#div-sign-up').hide();
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
