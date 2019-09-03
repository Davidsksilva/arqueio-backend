module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'furnisher_id', {
      type: Sequelize.INTEGER,
      references: { model: 'furnishers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'furnisher_id');
  },
};
