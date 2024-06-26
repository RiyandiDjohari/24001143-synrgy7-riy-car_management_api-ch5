import type { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config();

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: "postgres",
      user: "postgres.gwrgedsckhfraevjpweh",
      password: "17agustus1945",
      port: 6543,
      host: "aws-0-us-east-1.pooler.supabase.com",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/database/migrations",
    },
    seeds: {
      directory: 'src/database/seeds',
    },

  },

  staging: {
    client: "postgresql",
    connection: {
      database: "db_cars",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "db_cars",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

export default config;