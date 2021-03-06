import Sequelize, { Model } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        tags: Sequelize.ARRAY(Sequelize.STRING),
        products_ids: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'image_id', as: 'image' });
    this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
    this.belongsTo(models.Furnisher, {
      foreignKey: 'furnisher',
      as: 'sponsor',
    });
  }
}

export default Post;
