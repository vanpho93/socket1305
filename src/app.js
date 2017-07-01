const io = require('socket.io-client');
const $ = require('jquery');
const handleOnlineUser = require('./handleOnlineUser');

const socket = io('http://localhost:3000');
let idRemote;

handleOnlineUser(socket);
socket.on('SERVER_SEND_MESSAGE', value => {
    $('#listMessage').append(`<li>${value}</li>`);
});

socket.on('SERVER_SEND_PRIVATE_MESSAGE', value => {
    $('#listMessage').append(`<li>${value}</li>`);
});

$('#div-chat').hide();

function sendText(event) { // eslint-disable-line
    event.preventDefault();
    const msg = $('#txtMessage').val();
    $('#txtMessage').val('');
    socket.emit('CLIENT_SEND_MESSAGE', msg);
}

$('#btnSignUp').click(() => {
    const username = $('#txtUsername').val();
    socket.emit('CLIENT_SIGN_UP', username);
});

$('#listUser').on('click', 'li', function () {
    $('#listUser li').removeClass('active');
    $(this).addClass('active');
    const idAttr = $(this).attr('id');
    idRemote = idAttr.substring(5);
});

$('#btnSendPrivate').click(() => {
    const msg = $('#txtMessage').val();
    socket.emit('PRIVATE_MESSAGE', { idRemote, msg });
});

$('#btnSendRoom').click(() => {
    const msg = $('#txtMessage').val();
    socket.emit('ROOM_MESSAGE', msg);
});

$('.li-room').click(function () {
    const idRoom = $(this).attr('id');
    $('.li-room').removeClass('activeRoom');
    $(this).addClass('activeRoom');
    socket.emit('CLIENT_JOIN_ROOM', idRoom);
});
