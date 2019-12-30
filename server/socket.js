const http = require('./server');
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.on('toggle noise', (playerId) => {
    io.emit('toggle noise', playerId);
  });
});
