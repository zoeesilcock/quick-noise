const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes.
app.get('/api/hello', (req, res) => {
  res.send({ response: 'Hello from Quick Noise API' });
});

// Socket.
io.on('connection', (socket) => {
  socket.on('toggle noise', () => {
    io.emit('toggle noise');
  });
});

// Serve the frontend in production.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

http.listen(port, () => console.log(`Listening on port ${port}`));
