const Species = require('./Species');

const mapSpecies = (species) => ({
  id: species._id.toString(),
  image_url: species.imageUrl,
  scientific_name: species.scientificName,
  description: species.description,
  protocol: species.protocol,
  year_found: species.yearFound,
  scientist_name: species.scientistName,
  habitat: species.habitat,
  classification: species.classification,
  created_at: species.createdAt,
  updated_at: species.updatedAt,
});

const findAll = async (search = '') => {
  const term = String(search).trim();
  const query = term
    ? {
        $or: [
          { scientificName: { $regex: term, $options: 'i' } },
          { scientistName: { $regex: term, $options: 'i' } },
          { yearFound: Number.isNaN(Number(term)) ? null : Number(term) },
        ].filter(Boolean),
      }
    : {};

  const rows = await Species.find(query).sort({ createdAt: -1 }).lean();
  return rows.map(mapSpecies);
};

const findById = async (id) => {
  const species = await Species.findById(id).lean();
  return species ? mapSpecies(species) : null;
};

const create = async ({ imageUrl, scientificName, description, protocol, yearFound, scientistName, habitat, classification }) => {
  const species = await Species.create({
    imageUrl: imageUrl || null,
    scientificName: scientificName.trim(),
    description: description.trim(),
    protocol: protocol.trim(),
    yearFound: Number(yearFound),
    scientistName: scientistName.trim(),
    habitat: habitat.trim(),
    classification: classification.trim(),
  });
  return species._id.toString();
};

const updateById = async (id, { imageUrl, scientificName, description, protocol, yearFound, scientistName, habitat, classification }) => {
  const result = await Species.updateOne(
    { _id: id },
    {
      imageUrl: imageUrl || null,
      scientificName: scientificName.trim(),
      description: description.trim(),
      protocol: protocol.trim(),
      yearFound: Number(yearFound),
      scientistName: scientistName.trim(),
      habitat: habitat.trim(),
      classification: classification.trim(),
    }
  );
  return result.modifiedCount || result.matchedCount;
};

const deleteById = async (id) => {
  const result = await Species.deleteOne({ _id: id });
  return result.deletedCount;
};

const stats = async () => {
  const totalSpecies = await Species.countDocuments();
  const perYearRaw = await Species.aggregate([
    { $group: { _id: '$yearFound', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  const topScientistsRaw = await Species.aggregate([
    { $group: { _id: '$scientistName', count: { $sum: 1 } } },
    { $sort: { count: -1, _id: 1 } },
    { $limit: 5 },
  ]);
  const recentRaw = await Species.find().sort({ createdAt: -1 }).limit(5).lean();

  const perYear = perYearRaw.map((row) => ({ year: row._id, count: row.count }));
  const topScientists = topScientistsRaw.map((row) => ({ scientist: row._id, count: row.count }));
  const recentlyAdded = recentRaw.map((row) => ({
    id: row._id.toString(),
    scientific_name: row.scientificName,
    created_at: row.createdAt,
  }));

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
