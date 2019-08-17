import Sequelize, { Model } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
        collaborators: Sequelize.ARRAY(Sequelize.INTEGER),
        closed_at: Sequelize.DATE,
        closed: {
          type: Sequelize.VIRTUAL,
          get() {
            return !!this.closed_at;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
    this.belongsTo(models.User, { foreignKey: 'client_id', as: 'client' });
    this.belongsTo(models.File, { foreignKey: 'cover_id' }, { as: 'image' });
  }
}

export default Project;
