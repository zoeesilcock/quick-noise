let events = {};

export const socketClient = jest.fn();
export const socketOn = jest.fn();
export const socketEmit = jest.fn();

socketClient.mockReturnValue({
  on: socketOn.mockImplementation((event, callback) => {
    if (events[event]) {
      return events[event].push(callback);
    }
    events[event] = [callback];
  }),
  emit: socketEmit,
});

export const serverSocket = {
  emit: jest.fn().mockImplementation((event, ...args) => {
    events[event].forEach(func => func(...args));
  }),
};

export const socketCleanup = () => {
  events = {};
}

export default socketClient;
