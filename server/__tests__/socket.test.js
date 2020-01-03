import '../socket';
import models from '../models';
import { socket, ioEmit, socketEmit } from '../__mocks__/socket.io';

jest.mock('../models/player', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  return dbMock.define('Player', { id: 'fake-player-id' });
});

// Workaround for the fact that sequelize-mock doesn't support findByPK yet.
models.Player.findByPk = (id, opts) => models.Player.findById(id, opts);

it('emits "toggle noise" when it received the "toggle noise" event', () => {
  socket.emit('toggle noise');
  expect(ioEmit).toHaveBeenCalledTimes(1);
  expect(ioEmit).toHaveBeenCalledWith('toggle noise');
});

it('emits "set volume" when it received the "set volume" event', () => {
  const volume = '-9';
  socket.emit('set volume', volume);
  expect(socketEmit).toHaveBeenCalledTimes(1);
  expect(socketEmit).toHaveBeenCalledWith('set volume', volume);
});
