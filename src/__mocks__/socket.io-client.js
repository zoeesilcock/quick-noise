const socketClient = jest.fn();

socketClient.mockReturnValue({
  on: function() { }
});

module.exports = socketClient;
