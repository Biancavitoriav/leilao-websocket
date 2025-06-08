//criando a conexão 
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

//lista de lances a serem recebidos do html
let lances = [];

wss.on('connection', (ws) => {
  //eenviando a lista de volta para o html
  ws.send(JSON.stringify(lances));

  //recebendo as mensagens e guardando
  ws.on('message', (message) => {
    const msgStr = message.toString();
    lances.push(msgStr);

    //convertendo os dados e enviando os lances
    const json = JSON.stringify(lances);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(json);
      }
    });

  });
});

console.log('Servidor WebSocket ativo em ws://localhost:8080');
