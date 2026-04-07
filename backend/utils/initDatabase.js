const Species = require('../models/Species');
const { defaultSpeciesData, protocolFallbackText } = require('./defaultSpeciesData');

const initializeDatabase = async () => {
  const existingCount = await Species.countDocuments();
  if (existingCount === 0) {
    await Species.insertMany(defaultSpeciesData, { ordered: true });
    return;
  }

  for (const species of defaultSpeciesData) {
    await Species.updateOne(
      {
        scientificName: species.scientificName,
        $or: [{ protocol: { $exists: false } }, { protocol: '' }, { protocol: protocolFallbackText }],
      },
      { $set: { protocol: species.protocol } }
    );
  }
};

module.exports = { initializeDatabase };
