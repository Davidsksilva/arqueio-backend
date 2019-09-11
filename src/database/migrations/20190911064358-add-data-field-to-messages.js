module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('messages', 'data', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('messages', 'data');
  },
};
