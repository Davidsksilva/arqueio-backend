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
}

export default Conversation;
