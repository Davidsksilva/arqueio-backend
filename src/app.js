import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import socketIO from 'socket.io/lib/socket';
import routes from './routes';
import './database';

import User from './app/models/User';
import ConversationController from './app/controllers/ConversationController';
import MessageController from './app/controllers/MessageController';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();

    /* this.server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    }); */
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: '*' }));
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  socketIO() {
    this.io = socketIO(this.server);
    this.mobileSockets = {};

    this.io.on('connection', socket => {
      socket.on('newUser', async payload => {
        const { id } = payload;

        const user = await User.findByPk(id);
        const users = await User.findAll();

        this.mobileSockets[user.id] = socket.id;
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
        const receiverSocketId = this.mobileSockets[receiver.id];
        socket.to(receiverSocketId).emit('incomingMessage', message);
      });
    });
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
