import { Model } from 'sequelize';

class Conversation extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user1_id', as: 'user1' });
    this.belongsTo(models.User, { foreignKey: 'user2_id', as: 'user2' });
  }
}

export default Conversation;
