function initWebSocket() {
  const urlParams = new URLSearchParams(window.location.search);
  const browserId = urlParams.get('b');
  const ws = new WebSocket(`ws://127.0.0.1:8888/?b=${browserId}`);
  document.documentElement.classList.add(`theme-${browserId}`);

  ws.onopen = function () {
    console.log("Connected to the server");
    setInterval(() => sendSquareDetails(ws), 5);
  };

  ws.onmessage = function (event) {
    if (event.data instanceof Blob) {
      const reader = new FileReader();
      reader.onload = function() {
        recreateOtherSquare(JSON.parse(reader.result));
      };
      reader.readAsText(event.data);
    } else {
      recreateOtherSquare(JSON.parse(event.data));
    }
  };

  ws.onerror = function (error) {
    console.log('WebSocket Error: ' + error);
  };
}

function sendSquareDetails(ws) {
  const square = document.querySelector('.square');
  const rect = square.getBoundingClientRect();
  const details = {
    width: rect.width,
    height: rect.height,
    x: window.screenX + rect.left,
    y: window.screenY + rect.top
  };
  ws.send(JSON.stringify(details));
}

function recreateOtherSquare(details) {
  let otherSquare = document.getElementById('other-square');
  if (!otherSquare) {
    otherSquare = document.createElement('div');
    otherSquare.id = 'other-square';
    otherSquare.className = 'square-2';
    document.body.appendChild(otherSquare);
  }

  otherSquare.style.width = `${details.width}px`;
  otherSquare.style.height = `${details.height}px`;
  otherSquare.style.position = 'fixed';
  otherSquare.style.left = `${details.x - window.screenX}px`;
  otherSquare.style.top = `${details.y - window.screenY}px`;
}
