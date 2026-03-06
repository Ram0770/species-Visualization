const pool = require('../config/db');

const findAll = async (search = '') => {
  const term = `%${String(search).trim()}%`;
  const [rows] = await pool.query(
    `SELECT id, image_url, scientific_name, description, protocol, year_found, scientist_name, habitat, classification, created_at, updated_at
     FROM species
     WHERE scientific_name LIKE ? OR scientist_name LIKE ? OR CAST(year_found AS CHAR) LIKE ?
     ORDER BY created_at DESC`,
    [term, term, term]
  );
  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM species WHERE id = ?', [id]);
  return rows[0] || null;
};

const create = async ({ imageUrl, scientificName, description, protocol, yearFound, scientistName, habitat, classification }) => {
  const [result] = await pool.query(
    `INSERT INTO species (image_url, scientific_name, description, protocol, year_found, scientist_name, habitat, classification)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      imageUrl || null,
      scientificName.trim(),
      description.trim(),
      protocol.trim(),
      Number(yearFound),
      scientistName.trim(),
      habitat.trim(),
      classification.trim(),
    ]
  );
  return result.insertId;
};

const updateById = async (id, { imageUrl, scientificName, description, protocol, yearFound, scientistName, habitat, classification }) => {
  const [result] = await pool.query(
    `UPDATE species
     SET image_url = ?, scientific_name = ?, description = ?, protocol = ?, year_found = ?, scientist_name = ?, habitat = ?, classification = ?
     WHERE id = ?`,
    [
      imageUrl || null,
      scientificName.trim(),
      description.trim(),
      protocol.trim(),
      Number(yearFound),
      scientistName.trim(),
      habitat.trim(),
      classification.trim(),
      id,
    ]
  );
  return result.affectedRows;
};

const deleteById = async (id) => {
  const [result] = await pool.query('DELETE FROM species WHERE id = ?', [id]);
  return result.affectedRows;
};

const stats = async () => {
  const [[{ totalSpecies }]] = await pool.query('SELECT COUNT(*) AS totalSpecies FROM species');
  const [perYear] = await pool.query(
    'SELECT year_found AS year, COUNT(*) AS count FROM species GROUP BY year_found ORDER BY year_found ASC'
  );
  const [topScientists] = await pool.query(
    `SELECT scientist_name AS scientist, COUNT(*) AS count
     FROM species
     GROUP BY scientist_name
     ORDER BY count DESC, scientist_name ASC
     LIMIT 5`
  );
  const [recentlyAdded] = await pool.query(
    `SELECT id, scientific_name, created_at
     FROM species
     ORDER BY created_at DESC
     LIMIT 5`
  );

  return { totalSpecies, perYear, topScientists, recentlyAdded };
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
  stats,
};
