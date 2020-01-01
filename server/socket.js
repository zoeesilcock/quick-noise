const _ = require('lodash');

const http = require('./server');
const io = require('socket.io')(http);
const models = require('./models');

const saveVolume = _.throttle((playerId, volume) => {
  models.Player.findByPk(playerId)
  .then(player => {
    player.update({ volume });
  });
}, 500, { trailing: true });

io.on('connection', (socket) => {
  const playerId = socket.handshake.query.playerId;

  socket.join(playerId);

  socket.on('toggle noise', () => {
    io.to(playerId).emit('toggle noise');
  });

  socket.on('set volume', (volume) => {
    socket.to(playerId).emit('set volume', volume);

    saveVolume(playerId, volume);
  });
});
