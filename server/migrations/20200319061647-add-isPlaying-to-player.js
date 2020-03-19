/* istanbul ignore file */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Players', 'isPlaying', Sequelize.BOOLEAN);
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn('Players', 'volume');
  }
};
