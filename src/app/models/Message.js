import Sequelize, { Model } from 'sequelize';

class Message extends Model {
  static init(sequelize) {
    super.init(
      {
        text: Sequelize.STRING,
        user: Sequelize.JSON,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Conversation, { foreignKey: 'conversation' });
  }
}

export default Message;
