import Message from '../models/Message';
import Conversation from '../models/Conversation';

class ConversationController {
  async findOrCreate(user1_id, user2_id) {
    let conversation = Conversation.findOne({
      where: {
        user1_id,
        user2_id,
      },
    });

    if (!conversation) {
      conversation = Conversation.create({
        user1_id,
        user2_id,
      });
    }

    const messages = Message.findAll({
      where: {
        conversation: conversation.id,
      },
      order: [['createdAt', 'DESC']],
    });

    conversation.messages = messages;

    return conversation;
  }
}

export default new ConversationController();
