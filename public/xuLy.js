const socket = io();
socket.on('SERVER_SEND_MESSAGE', value => {
    $('#listMessage').append(`<li>${value}</li>`)
});

$('#div-chat').hide();

function sendText(event) {
    event.preventDefault();
    const msg = $('#txtMessage').val();
    $('#txtMessage').val('')
    socket.emit('CLIENT_SEND_MESSAGE', msg);
}
