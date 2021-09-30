// Need to install socket library 11:23
// npm i socket.io

//also installed npm i nodemon --save-dev for a dev dependancy (this is the server to look for changes in dev)
const io = require("socket.io")(3001,{
  cors: ["http://localhost:8080"]
});

// runs everytime a client makes a connection to
// our server and give a socket instance for each one of them.
io.on('connection', socket => { //function that runs everytime client connects
  console.log(socket.id); //random ID assiged to each person when they connect to our  server
  // socket.on('custom-event',(number, string, object)=>{ // listen for the custom event
  //   // when ever a socket hears the "custom-event", we will call a function
  //   //console.log("custom-event", number, string, object);
  // });
  socket.on('send-message',(message)=>{ // listen for the custom event
    console.log("send-message -> ", message);
    //send the message down to our clients
    // we can call the message whatever we want.
//    io.emit('recieve-message', message); //send to every single socket. IO.emit send to all clients

  socket.broadcast.emit('recieve-message', message) //send message to every other sockect that is not me.
  });
})

//
