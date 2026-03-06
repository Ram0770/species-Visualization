const fs = require('fs/promises');
const path = require('path');
const mysql = require('mysql2/promise');

const initializeDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
  });

  try {
    await connection.query('CREATE DATABASE IF NOT EXISTS speciesvision');
    await connection.query('USE speciesvision');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS app_bootstrap (
        id TINYINT PRIMARY KEY,
        initialized_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const [rows] = await connection.query('SELECT id FROM app_bootstrap WHERE id = 1');
    if (rows.length) {
      return;
    }

    const schemaPath = path.resolve(__dirname, '..', '..', 'database', 'schema.sql');
    const schemaSql = await fs.readFile(schemaPath, 'utf8');
    await connection.query(schemaSql);
    await connection.query('INSERT INTO app_bootstrap (id) VALUES (1)');
  } finally {
    await connection.end();
  }
};

module.exports = { initializeDatabase };
