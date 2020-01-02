/* istanbul ignore file */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Players', 'volume', Sequelize.STRING);
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn('Players', 'volume');
  }
};
