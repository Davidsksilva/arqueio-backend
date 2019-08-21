require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: 'Amazon RDS',
    connectTimeout: 60000,
  },
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
