const _ = require('lodash');

const app = require('./app');
const http = require('./server');
const io = require('socket.io')(http);
const models = require('./models');

app.io = io;

const saveVolume = _.throttle((playerId, volume) => {
  models.Player.findByPk(playerId)
  .then(player => {
    player.update({ volume });
  });
}, 500, { trailing: true });

const saveIsPlaying = (playerId, isPlaying) => {
  models.Player.findByPk(playerId)
  .then(player => {
    player.update({ isPlaying });
  });
};

io.on('connection', (socket) => {
  const playerId = socket.handshake.query.playerId;

  socket.join(playerId);

  socket.on('toggle noise', (isPlaying) => {
    io.to(playerId).emit('toggle noise');

    saveIsPlaying(playerId, !isPlaying);
  });

  socket.on('set volume', (volume) => {
    socket.to(playerId).emit('set volume', volume);

    saveVolume(playerId, volume);
  });
});
