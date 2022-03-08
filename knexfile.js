module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST || "127.0.0.1",
      database: process.env.DB_NAME || "test_project",
      user: process.env.DB_USER || "admin",
      password: process.env.DB_PASS || "admin",
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
      directory: "./src/migrations",
    },
  },
};
