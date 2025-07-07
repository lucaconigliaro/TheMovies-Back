const { get } = require('http');
const db = require('../config/db')

// Recupera preferiti usando il token (senza userId nella URL)
const getFavoritesByToken = (req, res, next) => {
    const userId = req.user.id; // preso dal token

    const sql = `
    SELECT f.id, m.id AS movie_id, m.title, m.poster_url, m.director, m.year
    FROM favorites f
    JOIN movies m ON f.movie_id = m.id
    WHERE f.user_id = ?
    `;
    db.query(sql, [userId], (err, results) => {
        if (err) return next(err);
        res.json(results);
    });
};

// Aggiungi ai preferiti
const addFavorite = (req, res, next) => {
    // Prendi l'id utente dall'auth middleware (es. req.user.id)
    const user_id = req.user.id;
    const { movie_id } = req.body;

    if (!movie_id) {
        return res.status(400).json({ message: "movie_id è obbligatorio" });
    }

    const sql = `INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)`;

    db.query(sql, [user_id, movie_id], (err, results) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    status: 'fail',
                    message: 'Film già presente nei preferiti',
                });
            }
            return next(err);
        }
        res.status(201).json({
            status: 'success',
            message: 'Film aggiunto ai preferiti',
        });
    });
};

// Rimuovi dai preferiti
const removeFavorite = (req, res, next) => {
    const favoriteId = req.params.id;

    const sql = `DELETE FROM favorites WHERE id =?`;
    db.query(sql, [favoriteId], (err, results) => {
        if (err) {
            return next(err);
        }
        res.status(204).end();
    });
};

module.exports = {
    getFavoritesByToken,
    addFavorite,
    removeFavorite,
};