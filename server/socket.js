const http = require('./server');
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  const playerId = socket.handshake.query.playerId;

  socket.join(playerId);

  socket.on('toggle noise', () => {
    io.to(playerId).emit('toggle noise');
  });
});
