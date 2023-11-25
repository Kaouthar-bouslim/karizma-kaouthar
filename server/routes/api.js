const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const Recette = require('../models/recette');
const recetteController = require('../controllers/recetteController');
const User = require('../models/user')
const userController =require('../controllers/userController')
const authController =require('../controllers/AuthController')




// Route for creating a new Recette
router.post('/recettes', recetteController.createRecette);

// Route for getting all Recettes
router.get('/recettes', recetteController.getAllRecettes);

// Route for getting a specific Recette by ID
router.get('/recettes/:id', recetteController.getRecetteById);

// Route for updating a Recette by ID
router.put('/recettes/:id', recetteController.updateRecette);

// Route for deleting a Recette by ID
router.delete('/recettes/:id', recetteController.deleteRecette);


// Route for creating a new User
router.post('/users', userController.createUser);

// Route for getting all Users
router.get('/users', userController.getAllUsers);

// Route for getting a specific User by ID
router.get('/users/:id', userController.getUserById);

// Route for updating a User by ID
router.put('/users/:id', userController.updateUser);

// Route for deleting a User by ID
router.delete('/users/:id', userController.deleteUser);

// Route for user registration
router.post('/register', authController.registerUser);

// Route for user login
router.post('/login', authController.loginUser);

router.get('/todos', (req, res, next) => {
  // This will return all the data, exposing only the id and action field to the client
  Todo.find({}, 'action')
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/todos', (req, res, next) => {
  if (req.body.action) {
    Todo.create(req.body)
      .then((data) => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: 'The input field is empty',
    });
  }
});

router.delete('/todos/:id', (req, res, next) => {
  Todo.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});


  

module.exports = router;