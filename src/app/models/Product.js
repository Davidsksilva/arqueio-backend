import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        specs: Sequelize.JSON,
        description: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'image', as: 'imageUrl' });
    this.belongsTo(models.Furnisher, { foreignKey: 'furnisher' });
  }
}

export default Product;
