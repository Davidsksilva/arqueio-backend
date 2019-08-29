module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'furnisher', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'furnisher');
  },
};
