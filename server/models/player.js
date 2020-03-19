'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    name: DataTypes.STRING,
    token: DataTypes.STRING,
    new_remote_code: DataTypes.STRING,
    volume: DataTypes.STRING,
    isPlaying: DataTypes.BOOLEAN,
  }, {});
  Player.associate = function(models) {
    // associations can be defined here
  };
  return Player;
};
