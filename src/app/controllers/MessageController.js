import Message from '../models/Message';
import Conversation from '../models/Conversation';

class MessageController {
  async create(text, sender, receiver) {
    const message = await Message.create({
      text,
      user: {
        id: sender.id,
        name: sender.name,
      },
    });

    const conversation = await Conversation.findOrCreate(
      sender.id,
      receiver.id
    );

    message.setAttributes('conversation', conversation.id);

    return message;
  }
}

export default new MessageController();
