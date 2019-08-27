import Sequelize, { Model } from 'sequelize';

class Reference extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
    this.belongsTo(models.File, { foreignKey: 'image_id', as: 'image' });
  }
}

export default Reference;
