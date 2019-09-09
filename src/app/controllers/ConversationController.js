/* eslint-disable no-await-in-loop */
import { Op } from 'sequelize';
import Message from '../models/Message';
import Conversation from '../models/Conversation';
import User from '../models/User';
import File from '../models/File';

class ConversationController {
  async findOrCreate(user1_id, user2_id) {
    let conversation = await Conversation.findOne({
      where: {
        user1_id: {
          [Op.in]: [user1_id, user2_id],
        },
        user2_id: {
          [Op.in]: [user1_id, user2_id],
        },
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        user1_id,
        user2_id,
      });
    }

    return conversation;
  }

  async getMessages(conversationId) {
    const messages = await Message.findAll({
      where: {
        conversation: conversationId,
      },
      order: [['createdAt', 'DESC']],
    });

    const array = messages.map(message => ({
      // eslint-disable-next-line no-underscore-dangle
      _id: message.id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
    }));

    return array;
  }

  async searchContacts(id) {
    const conversations = await Conversation.findAll({
      where: {
        [Op.or]: [{ user1_id: { [Op.eq]: id } }, { user2_id: { [Op.eq]: id } }],
      },
    });

    const array = [];

    for (let i = 0; i < conversations.length; i += 1) {
      const contactId =
        conversations[i].user1_id === id
          ? conversations[i].user2_id
          : conversations[i].user1_id;

      const user = await User.findByPk(contactId, {
        attributes: ['id', 'name', 'email'],
        include: [
          {
            model: File,
            as: 'image',
            attributes: ['path'],
          },
        ],
      });

      array.push({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image ? { path: user.image.path } : null,
      });
    }

    return array;
  }
}

export default new ConversationController();
