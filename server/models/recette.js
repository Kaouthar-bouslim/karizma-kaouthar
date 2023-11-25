const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for recette
const RecetteSchema = new Schema({
  // Unique ID for each recette
  id: {
    type: String,
    unique: true,
  },

  // Name of the recette
  nom: {
    type: String,
    required: [true, 'The recipe name is required'],
  },

  // List of ingredients
  ingredients: [
    {
      type: String,
    }
  ],

  // Steps of preparation
  etapesPreparation: [
    {
      type: String,
    }
  ],

  // Duration of preparation
  dureePreparation: {
    type: Number,
    required: [true, 'The preparation duration is required'],
  },

  // Optional photo field
  photo: {
    type: String,
  },

  user: {
    type: String,
  },
});

// Create model for recette
const Recette = mongoose.model('Recette', RecetteSchema);

module.exports = Recette;
