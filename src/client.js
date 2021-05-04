import store from "./redux/store";
import { newMessage, isConnected, storeUsersOnline } from "./redux/actions";

/** CLIENT CONFIGURATION - connect to the server */
const socketIOClient = require("socket.io-client");

// When deployed, connect to the hosted server, otherwise connect to local server
// Localhost port must match server
let host = process.env.NODE_ENV === 'production' ?
    "appname.herokuapp.com" : "localhost:4002"   
let socket = socketIOClient.connect(host, {secure: true});
// Checks which host we're connected to (for troubleshooting);
console.log("connected to " + host);

socket.on("notification", msg => {
    console.log(msg);
});

socket.on("all messages", msg => {
    // console.log(msg);
    store.dispatch(newMessage(msg));
});

socket.on("chat joined", () => {
    store.dispatch(isConnected());
});

socket.on("users online", (users)=> {
    store.dispatch(storeUsersOnline(users));
})

// This process will allow different clients to have duplicate usernames! A real 
// application should first check with the server to make sure the client's
// username is unique.
export const joinChat = username => {
    socket.emit("join", username);
}

export const sendMessage = msg => {
    socket.emit("new message", msg);
}