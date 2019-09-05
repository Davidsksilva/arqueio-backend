import app from './app';
import User from './app/models/User';
import ConversationController from './app/controllers/ConversationController';
import MessageController from './app/controllers/MessageController';

const server = require('http').Server(app);

const io = require('socket.io')(server);

const mobileSockets = {};

io.on('connection', socket => {
  socket.on('newUser', async payload => {
    const { id } = payload;

    const user = await User.findByPk(id);
    const users = await User.findAll();

    mobileSockets[user.id] = socket.id;
    socket.emit('userCreated', { user, users });
    socket.broadcast.emit('newUser', user);
  });

  socket.on('chat', async users => {
    const conversation = ConversationController.findOrCreateConversation(
      users.user.id,
      users.receiver.id
    );

    socket.emit('priorMessages', conversation.messages);
  });

  socket.on('message', async ({ text, sender, receiver }) => {
    const message = MessageController.createMessage(text, sender, receiver);

    socket.emit('incomingMessage', message);
    const receiverSocketId = mobileSockets[receiver.id];
    socket.to(receiverSocketId).emit('incomingMessage', message);
  });
});

server.listen(1337);
