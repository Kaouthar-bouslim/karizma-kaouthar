const Recette = require('../models/recette');

// Controller for handling Recette operations

// Create a new Recette
const createRecette = async (req, res) => {
    try {
      const { id,nom, ingredients, etapesPreparation, dureePreparation, photo } = req.body;
  
      console.log(req.body)
      const newRecette = new Recette({
        id,
        nom,
        ingredients,
        etapesPreparation,
        dureePreparation,
        photo,
      });
  
      const savedRecette = await newRecette.save();
  
      res.status(201).json(savedRecette);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
// Get all Recettes
const getAllRecettes = async (req, res) => {
  try {
    const recettes = await Recette.find();
    res.status(200).json(recettes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Recette by ID
const getRecetteById = async (req, res) => {
  try {
    
    const recette = await Recette.findById(req.params.id);
    if (!recette) {
      return res.status(404).json({ message: 'Recette not found' });
    }
    res.status(200).json(recette);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Recette by ID
const updateRecette = async (req, res) => {
  try {
    const updatedRecette = await Recette.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecette) {
      return res.status(404).json({ message: 'Recette not found' });
    }
    res.status(200).json(updatedRecette);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Recette by ID
const deleteRecette = async (req, res) => {
  try {
    await Recette.findByIdAndDelete(
      
        
          req.params.id
        
      ).then((data) => res.json(data));
  
    //res.status(200).json("done");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRecette,
  getAllRecettes,
  getRecetteById,
  updateRecette,
  deleteRecette,
};
