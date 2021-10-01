//RUN SERVER -->
// Install snowpack by typing npm install snowpack
// Start server by npm start

//For sockets add npm i socket.io-client

import {io} from 'socket.io-client'
// import "setimmediate";

const joinRoomButton = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');

const socket = io('http://localhost:3001') //pass the Url of our server

//the user namespace socket
// we can pass in auth information
const userSocket = io('http://localhost:3001/user',{auth:{token:'Test'}})

//check connection, this will listen to any event. Can create our own custom events
// or we can use connect. This is an event that will run evertime we connect to our SERVER
socket.on('connect', () => {
  //print something out
  displayMessage("You connected with ID:" + socket.id)  // display a message to the screen

//  socket.emit('custom-event', 10, "hi", { a:"a" }) // always connected before sneding event
});

socket.on('recieve-message', message => {
  displayMessage(message); // display message from server
})

//send events up to the server
// take any event you want and send it to the server
// we can name the event anything we want & we can pass it any information we want.
// in our server we will listen for this "custom-event" event.
// socket.emit('custom-event', 10, "hi", { a:"a" }) // sometimes you may see that it does not get sent up. This is because we don't connet in time. May need to put it inside your on connect to make sure we are alway connected before we can send these events.

form.addEventListener("submit", e => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if(message === '') return;

  displayMessage(message);
  //socket.emit('send-message', message); //pass up the message we are sending

  //To send a message to another user, send the room with the message
  // the room is there ID
  socket.emit('send-message', message, room);

  messageInput.value=""
})

joinRoomButton.addEventListener("click", () => {
  //send to multiple people but not to everyone. We can send to custom rooms
  const room = roomInput.value;

  // you can pass it a callback function
  //it get called from the server back down to the client
  socket.emit("join-room", room, message => {
    displayMessage(message);
  })
})

function displayMessage(message){
  const div = document.createElement("div");
  div.textContent = message;
  div.style.backgroundColor = "lightgrey"
  div.style.borderBottom = "1px solid #FFFFFF"
  document.getElementById("message-container").append(div);
}
