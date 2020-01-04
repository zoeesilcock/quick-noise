export const IncomingMessage = class { };
export const ServerResponse = class { };

export const listen = jest.fn().mockReturnValue(null);

export const createServer = jest.fn().mockReturnValue({
  listen,
});

const http = {
  createServer,
};

export default http;
