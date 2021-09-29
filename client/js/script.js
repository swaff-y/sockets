//RUN SERVER -->
// Install http-server by typing npm install -g http-server
// Change into your working directory, where yoursome.html lives
// Start your http server by issuing http-server -c-1

const joinRoomButton = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');

form.addEventListener("submit", e => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if(message === '') return;

  displayMessage(message);

  messageInput.value=""
})

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
})

function displayMessage(message){
  const div = document.createElement("div");
  div.textContent = message;
  div.style.backgroundColor = "lightgrey"
  div.style.borderBottom = "1px solid #FFFFFF"
  document.getElementById("message-container").append(div);
}
