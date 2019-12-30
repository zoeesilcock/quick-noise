var models = require('../models');

const getPlayer = function(req, res) {
  models.Player.findByPk(req.params.id)
  .then(player => {
    return res.json({ player });
  });
};

const createPlayer = function(req, res) {
  models.Player.create({ name: "Player name", token: 'generate-unique-token-here' })
  .then(player => {
    return res.json({ player });
  })
  .catch(err => {
    console.log(err);
    return err;
  });
};

const getNewRemoteCode = function(req, res) {
  models.Player.findByPk(req.params.id)
  .then(player => {
    player.update({ new_remote_code: Math.floor(10000000 + Math.random() * 90000000) })
    .then(player => {
      return res.json({ remote_code: player.new_remote_code });
    });
  });
}

const updatePlayer = function(req, res) {
  console.log('Update player!');
};

exports.getPlayer = getPlayer;
exports.createPlayer = createPlayer;
exports.updatePlayer = updatePlayer;
exports.getNewRemoteCode = getNewRemoteCode;
