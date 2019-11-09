const http = require('./server');
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.on('toggle noise', () => {
    io.emit('toggle noise');
  });
});
