module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('posts', 'tags', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('posts', 'tags');
  },
};
