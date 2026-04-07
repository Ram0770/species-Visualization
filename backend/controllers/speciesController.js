const streamifier = require('streamifier');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');
const speciesModel = require('../models/speciesModel');

const listSpecies = async (req, res, next) => {
  try {
    const { search = '' } = req.query;
    const rows = await speciesModel.findAll(search);
    return res.json({ data: rows });
  } catch (error) {
    return next(error);
  }
};

const getSpeciesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const species = await speciesModel.findById(id);

    if (!species) {
      return res.status(404).json({ message: 'Species not found' });
    }

    return res.json({ data: species });
  } catch (error) {
    return next(error);
  }
};

const validateSpeciesInput = (body) => {
  const { scientificName, description, protocol, yearFound, scientistName, habitat, classification } = body;

  if (!scientificName || !description || !protocol || !yearFound || !scientistName || !habitat || !classification) {
    return 'All species fields are required';
  }

  if (Number.isNaN(Number(yearFound)) || Number(yearFound) < 1 || Number(yearFound) > 2100) {
    return 'Year found must be a valid number';
  }

  return null;
};

const createSpecies = async (req, res, next) => {
  try {
    const validationError = validateSpeciesInput(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const id = await speciesModel.create(req.body);
    const created = await speciesModel.findById(id);

    return res.status(201).json({ message: 'Species added successfully', data: created });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'A species with this scientific name already exists' });
    }
    return next(error);
  }
};

const updateSpecies = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validationError = validateSpeciesInput(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const existing = await speciesModel.findById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Species not found' });
    }

    await speciesModel.updateById(id, req.body);
    const updated = await speciesModel.findById(id);

    return res.json({ message: 'Species updated successfully', data: updated });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'A species with this scientific name already exists' });
    }
    return next(error);
  }
};

const deleteSpecies = async (req, res, next) => {
  try {
    const { id } = req.params;
    const affectedRows = await speciesModel.deleteById(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Species not found' });
    }

    return res.json({ message: 'Species deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

const uploadSpeciesImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    if (!isCloudinaryConfigured()) {
      return res.status(503).json({
        message:
          'Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend .env for permanent image storage.',
      });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'speciesvision/species', resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    return res.json({ imageUrl: uploadResult.secure_url });
  } catch (error) {
    return next(error);
  }
};

const getSpeciesStats = async (_req, res, next) => {
  try {
    const data = await speciesModel.stats();
    return res.json({ data });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  listSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies,
  uploadSpeciesImage,
  getSpeciesStats,
};
