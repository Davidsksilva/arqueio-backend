import Sequelize, { Model } from 'sequelize';

class Furnisher extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
        email: Sequelize.STRING,
        contact: Sequelize.STRING,
        address: Sequelize.STRING,
        social: Sequelize.JSON,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'image' });
  }
}

export default Furnisher;
