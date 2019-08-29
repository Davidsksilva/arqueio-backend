import Sequelize from 'sequelize';

import User from '../app/models/User';
import Project from '../app/models/Project';
import File from '../app/models/File';
import Post from '../app/models/Post';
import Task from '../app/models/Task';
import Tag from '../app/models/Tag';
import Furnisher from '../app/models/Furnisher';
import Reference from '../app/models/Reference';
import RefFolder from '../app/models/RefFolder';
import databaseConfig from '../config/database';

const models = [
  User,
  Project,
  File,
  Post,
  Task,
  Tag,
  Furnisher,
  Reference,
  RefFolder,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
