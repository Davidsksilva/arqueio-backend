module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('messages', 'user', {
      type: Sequelize.JSON,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('messages', 'user');
  },
};
