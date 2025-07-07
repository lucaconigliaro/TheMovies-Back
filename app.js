const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importazione delle rotte
const moviesRoutes = require('./routes/moviesRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');

// Importazione ErrorHandler
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per CORS
app.use(cors());

// Middleware per il parsing del JSON
app.use(express.json());

// Rotte
app.use('/movies', moviesRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/users', usersRoutes);
app.use('/favorites', favoritesRoutes);

// Test endpoint
app.get('/', (req, res) => {
    res.send('API is running 🎬');
});

// Gestione degli errori
app.use(errorHandler);

// Avvio del server
app.listen(PORT, () => {
    console.log(`✅ Server avviato su http://localhost:${PORT}`);
});