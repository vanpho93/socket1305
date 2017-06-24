const socket = io();
socket.on('SERVER_SEND_MESSAGE', value => console.log(value));

$('#btnSend').click(() => {
    const msg = $('#txtMessage').val();
    $('#txtMessage').val('')
    socket.emit('CLIENT_SEND_MESSAGE', msg);
});

