const path = require('path');

const DB_PATH = path.join(__dirname, 'db');
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT || 5432,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    pool: {
      min: process.env.POSTGRES_POOL_MIN,
      max: process.env.POSTGRES_POOL_MAX,
    },
    migrations: {
      directory: path.join(DB_PATH, 'migrations'),
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: path.join(DB_PATH, 'seeds'),
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: {
      host: process.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT || 5432,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(DB_PATH, 'migrations'),
      tableName: 'knex_migrations',
    },
    useNullAsDefault: true,
  },
};