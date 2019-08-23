module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'furnisher', {
      type: Sequelize.INTEGER,
      references: { model: 'furnishers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('products', 'furnisher');
  },
};
