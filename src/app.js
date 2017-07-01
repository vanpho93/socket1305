const io = require('socket.io-client');
const $ = require('jquery');

const socket = io();
let idRemote;

socket.on('SERVER_SEND_MESSAGE', value => {
    $('#listMessage').append(`<li>${value}</li>`);
});

socket.on('SERVER_SEND_PRIVATE_MESSAGE', value => {
    $('#listMessage').append(`<li>${value}</li>`);
});

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
