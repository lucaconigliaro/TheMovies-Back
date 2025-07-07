const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');
const authMiddleware = require('../middleware/authMiddleware');
const validateReview = require('../middleware/validateReview');

// Prendi tutte le recensioni (opzionale)
router.get('/', reviewsController.getAllReviews);

// Prendi recensioni di un film
router.get('/movie/:movieId', reviewsController.getReviewsByMovieId);

// Crea una recensione (protetta)
router.post('/', authMiddleware, validateReview, reviewsController.createReview);

// Aggiorna una recensione (protetta)
router.put('/:id', authMiddleware, validateReview, reviewsController.updateReview);

// Elimina una recensione (protetta)
router.delete('/:id', authMiddleware, reviewsController.deleteReview);

// Prendi recensioni di un utente (protetta)
router.get('/user', authMiddleware, reviewsController.getUserReviews);

module.exports = router;