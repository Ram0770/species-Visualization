const fs = require('fs/promises');
const path = require('path');
const mysql = require('mysql2/promise');

const initializeDatabase = async () => {
  const dbName = process.env.DB_NAME || 'speciesvision';
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: dbName,
      multipleStatements: true,
    });
  } catch (error) {
    // Local/dev fallback: create DB only when it does not exist and we have privileges.
    if (error.code !== 'ER_BAD_DB_ERROR') {
      throw error;
    }

    const adminConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true,
    });

    try {
      await adminConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    } finally {
      await adminConnection.end();
    }

    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: dbName,
      multipleStatements: true,
    });
  }

  try {
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
    const rawSchemaSql = await fs.readFile(schemaPath, 'utf8');
    // Execute schema without DB-level statements because connection is already scoped to DB_NAME.
    const schemaSql = rawSchemaSql
      .replace(/^CREATE DATABASE.*;$/gim, '')
      .replace(/^USE .*;$/gim, '');
    await connection.query(schemaSql);
    await connection.query('INSERT INTO app_bootstrap (id) VALUES (1)');
  } finally {
    await connection.end();
  }
};

module.exports = { initializeDatabase };
