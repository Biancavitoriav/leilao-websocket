const express = require('express');
const http = require('http');
const WebSocket = require('ws');
 
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
 
let tasks = [];
 
app.use(express.static('public'));
 
wss.on('connection', (ws) => {
    console.log('Novo cliente conectado');
 
    ws.send(JSON.stringify({ type: 'init', tasks }));
 
    ws.on('message', (message) => {
       
    });
 
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});
 
function broadcast(data) {
    const msg = JSON.stringify(data);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
}
 
server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
 