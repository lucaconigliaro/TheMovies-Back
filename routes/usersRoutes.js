const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validateUser = require('../middleware/validateUser');
const authMiddleware = require('../middleware/authMiddleware');

// Registrazione (aggiungi la validazione)
router.post('/signup', validateUser, usersController.signup);

// Login (può usare la stessa validazione)
router.post('/login', validateUser, usersController.login);

// Verifica del token (richiede autenticazione)
router.get('/verify-token', authMiddleware, usersController.verifyToken);

module.exports = router;