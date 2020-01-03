import request from 'supertest';

import app from '../../app';
import models from '../../models';

jest.mock('../../models/player', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  return dbMock.define('Player');
});

const testServer = request.agent(app);
const player = {
  id: '420',
  new_remote_code: '12345678',
}

// Respond to the queries run by the controller.
models.Player.$queryInterface.$useHandler(function(query, queryOptions, done) {
  if (query === 'findById') {
      if (queryOptions[0] === player.id) {
          return models.Player.build(player);
      } else {
          return null;
      }
  } else if (query === 'findOne') {
    if (queryOptions[0].where.new_remote_code === player.new_remote_code) {
      return models.Player.build(player);
    } else {
      return null;
    }
  }
});

// Workaround for the fact that sequelize-mock doesn't support findByPK yet.
models.Player.findByPk = (id, opts) => models.Player.findById(id, opts);

beforeEach(() => {
  jest.resetModules();
});

describe('getPlayer', () => {
  it('responds with json of player', async () => {
    const res = await testServer
      .get(`/api/player/${player.id}`)
      .set('Accept', 'application/json');

    const playerResponse = JSON.parse(res.text).player;

    expect(res.status).toBe(200);
    expect(playerResponse.id).toBe(player.id);
  });
});

describe('createPlayer', () => {
  it('responds with json of the newly created player', async () => {
    const res = await testServer
      .post('/api/player')
      .set('Accept', 'application/json');

    const playerResponse = JSON.parse(res.text).player;

    expect(res.status).toBe(200);
    expect(playerResponse.name).toBe('Player name');
    expect(playerResponse.token).toBe('generate-unique-token-here');
  });
});

describe('getNewRemoteCode', () => {
  it('responds with json of the newly created remote_code', async () => {
    const res = await testServer
      .get(`/api/player/${player.id}/remotecode`)
      .set('Accept', 'application/json');

    const remoteCode = JSON.parse(res.text).remote_code;

    expect(res.status).toBe(200);
    expect(remoteCode.toString().length).toBe(8);

    models.Player.findByPk(player.id)
    .then(updatedPlayer => {
      expect(updatedPlayer.new_remote_code === remoteCode);
    });
  });
});

describe('connectToPlayer', () => {
  it('responds with json of the player id', async () => {
    const res = await testServer
      .get(`/api/player/connect/${player.new_remote_code}`)
      .set('Accept', 'application/json');

    const id = JSON.parse(res.text).playerId;

    expect(res.status).toBe(200);
    expect(id).toBe(player.id);
  });
});
