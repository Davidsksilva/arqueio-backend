module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('products', 'url');
  },
};
