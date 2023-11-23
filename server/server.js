const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8888 });

const clients = {};

wss.on('connection', (ws, req) => {
  const queryParams = new URLSearchParams(req.url.substring(1));
  const browserId = queryParams.get('b');

  clients[browserId] = ws;

  ws.on('message', (message) => {
    Object.keys(clients).forEach((id) => {
      if (id !== browserId && clients[id].readyState === WebSocket.OPEN) {
        clients[id].send(message);
      }
    });
  });

  ws.on('close', () => {
    delete clients[browserId];
  });
});
