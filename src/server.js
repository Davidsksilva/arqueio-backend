import app from './app';
import User from './app/models/User';
import ConversationController from './app/controllers/ConversationController';
import MessageController from './app/controllers/MessageController';
import UserController from './app/controllers/UserController';

const server = require('http').Server(app);

const io = require('socket.io')(server);

const mobileSockets = {};

io.on('connection', socket => {
  socket.on('newUser', async payload => {
    const { id } = payload;

    const user = await User.findByPk(id);
    // const users = await User.findAll();

    mobileSockets[user.id] = socket.id;
    // socket.emit('userCreated', { user, users });
    socket.broadcast.emit('newUser', user);
  });

  socket.on('login', async payload => {
    const { id } = payload;

    mobileSockets[id] = socket.id;

    const users = await ConversationController.searchContacts(id);

    socket.emit('users', users);
  });

  socket.on('chat', async users => {
    const conversation = await ConversationController.findOrCreate(
      users.user.id,
      users.receiver.id
    );

    const messages = await ConversationController.getMessages(conversation.id);

    const user = await UserController.getUserData(users.receiver.id);

    const payload = {
      messages,
      user: {
        id: users.receiver.id,
        user,
      },
    };

    socket.emit('priorMessages', payload);
  });

  socket.on('chats', async user => {
    const messages = await ConversationController.getConversationsMessages(
      user.id
    );

    socket.emit('allPriorMessages', messages);
  });

  socket.on('message', async ({ text, sender, receiver }) => {
    const message = await MessageController.create(text, sender, receiver);
    const payload = {
      users: [sender.id, receiver.id],
      message: {
        _id: message.id,
        text: message.text,
        createdAt: message.createdAt,
        user: {
          _id: sender.id,
          name: sender.name,
          avatar: sender.avatar,
        },
        read: false,
      },
    };

    socket.emit('incomingMessage', payload);
    const receiverSocketId = mobileSockets[receiver.id];
    io.to(receiverSocketId).emit('incomingMessage', payload);
  });
});

server.listen(1337);
