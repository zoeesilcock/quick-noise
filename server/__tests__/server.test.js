import '../index';

import http from 'http';

jest.mock('http');

it('is listening for incomming connections', () => {
  expect(http.createServer).toHaveBeenCalledTimes(1);
  expect(http.createServer().listen).toHaveBeenCalledTimes(1);
});
