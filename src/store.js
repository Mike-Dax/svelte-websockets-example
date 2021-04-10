import { writable } from "svelte/store";

const messageStore = writable("");

const socket = new WebSocket("wss://echo.websocket.org");

// Connection opened
socket.addEventListener("open", function (event) {
  console.log("It's open");
});

// Listen for messages
socket.addEventListener("message", function (event) {
  messageStore.set(event.data);
});

const sendMessage = (message) => {
  if (socket.readyState <= 1) {
    socket.send(message);
  }
};

const storeMessage = (message) => {
  messageStore.set(`You: ${message}`);
};

export default {
  subscribe: messageStore.subscribe,
  storeMessage,
  sendMessage,
};
