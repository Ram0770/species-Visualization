const express = require('express');
const multer = require('multer');
const {
  listSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies,
  uploadSpeciesImage,
  getSpeciesStats,
} = require('../controllers/speciesController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', protect, listSpecies);
router.get('/stats/overview', protect, getSpeciesStats);
router.get('/:id', protect, getSpeciesById);

router.post('/', protect, authorizeRoles('lecturer'), createSpecies);
router.put('/:id', protect, authorizeRoles('lecturer'), updateSpecies);
router.delete('/:id', protect, authorizeRoles('lecturer'), deleteSpecies);
router.post('/upload/image', protect, authorizeRoles('lecturer'), upload.single('image'), uploadSpeciesImage);

module.exports = router;
