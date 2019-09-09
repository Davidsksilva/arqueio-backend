import { Op } from 'sequelize';
import Message from '../models/Message';
import Conversation from '../models/Conversation';

class MessageController {
  async create(text, sender, receiver) {
    const conversation = await Conversation.findCreateFind({
      where: {
        user1_id: {
          [Op.in]: [sender.id, receiver.id],
        },
        user2_id: {
          [Op.in]: [sender.id, receiver.id],
        },
      },
    });

    const message = await Message.create({
      text,
      user: {
        _id: sender.id,
        name: sender.name,
      },
      conversation: conversation[0].id,
    });

    return message;
  }
}

export default new MessageController();
