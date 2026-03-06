const pool = require('../config/db');

const findByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] || null;
};

const findSafeById = async (id) => {
  const [rows] = await pool.query(
    'SELECT id, full_name, email, role, created_at FROM users WHERE id = ?',
    [id]
  );
  return rows[0] || null;
};

const createLocalUser = async ({ fullName, email, role, passwordHash }) => {
  const [result] = await pool.query(
    'INSERT INTO users (full_name, email, role, password_hash) VALUES (?, ?, ?, ?)',
    [fullName, email, role, passwordHash]
  );
  return result.insertId;
};

const createGoogleUser = async ({ fullName, email, role, googleId }) => {
  const [result] = await pool.query(
    'INSERT INTO users (full_name, email, role, google_id) VALUES (?, ?, ?, ?)',
    [fullName, email, role, googleId]
  );
  return result.insertId;
};

module.exports = {
  findByEmail,
  findSafeById,
  createLocalUser,
  createGoogleUser,
};
