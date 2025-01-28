import type { Knex } from "knex";
import dotenv from 'dotenv';

dotenv.config();
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,  // Host do banco de dados
      user: process.env.DB_USER,  // Usuário do banco de dados
      password: process.env.DB_PASSWORD,  // Senha do banco de dados
      database: process.env.DB_NAME,  // Nome do banco de dados
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,  // Porta do banco de dados, 5432 é a porta padrão para PostgreSQL
      ssl: { rejectUnauthorized: false },  // Habilita SSL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: "knex_migrations",
      extension: 'ts'
    }
  },

  production: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      ssl: { rejectUnauthorized: false },  // Habilita SSL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: "knex_migrations",
      extension: 'ts'
    }
  }
};

export default config;
