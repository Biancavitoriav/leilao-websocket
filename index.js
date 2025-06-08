const socket = new WebSocket('ws://localhost:8080');
const input = document.getElementById('valorLance');
const btn = document.querySelector('button');
const logContainer = document.getElementById('logContainer');

socket.onopen = function () {
  console.log('Conectado ao servidor WebSocket');
};

// recebendo as mensagens do websocket
socket.onmessage = function (event) {
  try {
    const lances = JSON.parse(event.data); //chega como json, entao é preciso converter
    mostrarLances(lances);
  } catch (e) {
    console.error('Erro no parse JSON:', e);
  }
};

function mostrarLances(lances) {
  logContainer.innerHTML = '';  
  if (!Array.isArray(lances) || lances.length === 0) { //precisa estar vazio quando não houver nenhum lance
    return;
  }

  //adicionando o lance a partir do html
  lances.forEach(lance => {
    const novoEvento = document.createElement('div');
    novoEvento.className = 'alert alert-info';
    novoEvento.innerHTML = `<strong>Evento:</strong> ${lance}`;
    logContainer.appendChild(novoEvento);
  });
}

btn.onclick = function () {
  //limpando caso envie espaços desnecessários
  const valor = input.value.trim()

  //verifica se o usuário mandou algo errado e abre um alert de erro
  if (!valor || isNaN(valor) || Number(valor) <= 0) {
    alert('Digite um lance válido, ex: 50');
    return;
  }

  const mensagem = `Lance recebido de <strong>Alex</strong>: R$ ${parseFloat(valor).toFixed(2)}`;

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(mensagem); //se o websocket estiver aberto, manda uma mensagem para lá
  } else {
    alert('Conexão WebSocket não está aberta.');
  }

  input.value = ''; //limpa o input de entrada
};
