import server from '../index';

it('is listening for incomming connections', () => {
  expect(server.listening).toBe(true);
});
