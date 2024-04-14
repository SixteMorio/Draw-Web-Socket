// index.js (server)
const express = require("express");

const app = express();

const port = 3001;

const expressWs = require("express-ws");
expressWs(app);

const connections = [];

app.ws("/", (ws, req) => {
  console.log(`Client connected [${ws._socket._handle.fd}]`);
  connections.push(ws);

  ws.on("close", () => {
    connections.splice(connections.indexOf(ws), 1);
    console.log(`Client deconnected [${ws._socket._handle}]`);
  });

  ws.on("message", (message) => {
    console.log(message);
    // Diffuser à tous (sauf l'expéditeur)
    connections.forEach((connection) => {
      if (connection !== ws) {
        connection.send(message);
      }
    });
  });
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`App on port ${port}`);
});
