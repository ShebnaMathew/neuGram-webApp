/** SERVER CONFIGURATION */
const express = require("express");
const app = express();
const server = require('http').Server(app);
// The origin is used by CORS
const origin = process.env.NODE_ENV === "production" ? 
        "app-name.herokuapp.com" : "http://localhost:3000"; 
const io = require('socket.io')(server, { 
    cors: {
      origin: origin,
      methods: ["GET", "POST"]
    }
  });
const path = require("path");

// Choose a port, default is 4002 (could be almost anything)
const PORT = process.env.PORT || 4002;

// When on Heroku, serve the UI from the build folder
if (process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'build')));  
    app.get('*', (req, res) => {    
        res.sendfile(path.join(__dirname = 'build/index.html'));  
    })
}

// When on local host, server from the public folder. 
// Rule will not be written if production conditional has executed
app.get('*', (req, res) => {  
    app.sendFile(path.join(__dirname+'public/index.html'));
})

// Listen for client connections
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

let messages = [];

// Object to map client ids to their usernames
const clients = {}

const processMessage = msg => {
  messages.push(msg);
  io.sockets.emit("all messages", messages);
}

const sendUserList = () => {
  io.sockets.emit("users online", clients);
}

io.on("connection", client => {
    client.emit("notification", "Server says hello");

    client.on("join", username => {
      client.emit("chat joined");
      clients[username] = client.id;
      console.log(clients)
      processMessage(username + " has joined the chat");
      sendUserList();
    });

    client.on("new message", msg => {
      const userName = Object.keys(clients).find(username => clients[username] === client.id) 
      processMessage(userName + " says: "  + msg);
    });

    client.on("disconnect", () => {
      if (clients.hasOwnProperty(client.id))
          processMessage(clients[client.id] + " has left the chat");
    });
})
