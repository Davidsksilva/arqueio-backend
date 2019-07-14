module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('projects', 'closed_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('projects', 'closed_at');
  },
};
