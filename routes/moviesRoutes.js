const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const validateMovie = require('../middleware/validateMovie');
const authMiddleware = require('../middleware/authMiddleware');

// Index 
router.get('/', moviesController.getAllMovies);

// Show
router.get('/:id', moviesController.getMovieById);

// Create (protetta)
router.post('/', authMiddleware, validateMovie, moviesController.createMovie);

// Update (protetta)
router.put('/:id', authMiddleware, validateMovie, moviesController.updateMovie);

// Delete (protetta)
router.delete('/:id', authMiddleware, moviesController.deleteMovie);

module.exports = router;