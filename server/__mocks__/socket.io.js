let events = {};

const socketServer = jest.fn();
const onConnection = jest.fn();
const socketJoin = jest.fn();
const socketOn = jest.fn();
const socketTo = jest.fn();
const socketEmit = jest.fn();
const ioTo = jest.fn();
const ioEmit = jest.fn();
const socket = {
  handshake: { query: { playerId: 'fake-player-id' } },
  join: socketJoin.mockReturnValue(null),
  on: socketOn.mockImplementation((event, callback) => {
    if (events[event]) {
      return events[event].push(callback);
    }
    events[event] = [callback];
  }),
  emit: jest.fn().mockImplementation((event, ...args) => {
    events[event].forEach(func => func(...args));
  }),
  to: socketTo.mockReturnValue({
    emit: socketEmit,
  }),
};

socketServer.mockReturnValue({
  on: onConnection.mockImplementation((event, callback) => {
    callback(socket);
  }),
  to: ioTo.mockReturnValue({
    emit: ioEmit,
  }),
});

const socketCleanup = () => {
  events = {};
}

module.exports = socketServer;
module.exports.socket = socket;
module.exports.onConnection = onConnection;
module.exports.ioEmit = ioEmit;
module.exports.socketEmit = socketEmit;
module.exports.socketCleanup = socketCleanup;
