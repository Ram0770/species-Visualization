const { mongoose } = require('../config/db');

const speciesSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      default: null,
      trim: true,
    },
    scientificName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    protocol: {
      type: String,
      default: 'Species protocol is not documented yet for this record.',
      trim: true,
    },
    yearFound: {
      type: Number,
      required: true,
    },
    scientistName: {
      type: String,
      required: true,
      trim: true,
    },
    habitat: {
      type: String,
      required: true,
      trim: true,
    },
    classification: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

module.exports = mongoose.models.Species || mongoose.model('Species', speciesSchema);
