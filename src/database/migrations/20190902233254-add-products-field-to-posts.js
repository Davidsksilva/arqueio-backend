module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('posts', 'products_ids', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('posts', 'products_ids');
  },
};
