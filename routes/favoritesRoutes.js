const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');
const authMiddleware = require('../middleware/authMiddleware');
const validateFavorite = require('../middleware/validateFavorite');

// Tutti i preferiti dell’utente loggato
router.get('/', authMiddleware, favoritesController.getFavoritesByToken);

// Aggiungi un film ai preferiti
router.post('/', authMiddleware, validateFavorite, favoritesController.addFavorite);

// Rimuovi un preferito
router.delete('/:id', authMiddleware, favoritesController.removeFavorite);

module.exports = router;