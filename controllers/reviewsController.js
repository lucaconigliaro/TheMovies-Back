const db = require('../config/db');

// Prendi tutte le recensioni
const getAllReviews = (req, res, next) => {
    const sql = `
    SELECT r.*, u.username, u.id AS user_id, m.title AS movie_title
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    JOIN movies m ON r.movie_id = m.id
    ORDER BY r.created_at DESC
  `;
    db.query(sql, (err, results) => {
        if (err) {
            return next(err);
        }
        res.json({
            status: 'success',
            data: results
        });
    });
};

// Prendi recensioni di un film specifico
const getReviewsByMovieId = (req, res, next) => {
    const movieId = req.params.movieId;

    const sql = `
    SELECT r.*, u.username, u.id AS user_id
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.movie_id = ?
    ORDER BY r.created_at DESC
  `;
    db.query(sql, [movieId], (err, results) => {
        if (err) {
            return next(err);
        }
        res.json({
            status: 'success',
            data: results
        });
    });
};

// Crea una recensione (user autentificato)
const createReview = (req, res, next) => {
    const userId = req.user.id; // da authMiddleware
    const { movie_id, rating, comment } = req.body;

    if (!movie_id || !rating) {
        return res.status(400).json({
            status: 'fail',
            message: 'movie_id e rating sono obbligatori'
        });
    }

    const sql = `
    INSERT INTO reviews (user_id, movie_id, rating, comment) 
    VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [userId, movie_id, rating, comment || null], (err, results) => {
        if (err) {
            return next(err);
        }
        res.status(201).json({
            status: 'success',
            data: {
                id: results.insertId,
                user_id: userId,
                movie_id,
                rating,
                comment,
            }
        });
    });
};

// Aggiorna recensione (solo chi l'ha creata)
const updateReview = (req, res, next) => {
    const reviewId = req.params.id;
    const userId = req.user.id;
    const { rating, comment } = req.body;

    // Verifica che la recensione esista e appartenga all'utente
    const checkSql = `SELECT * FROM reviews WHERE id = ? AND user_id = ?`;
    db.query(checkSql, [reviewId, userId], (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Recensione non trovata o non autorizzato'
            });
        }

        // Update recensione
        const updateSql = `UPDATE reviews SET rating = ?, comment = ? WHERE id = ?`;
        db.query(updateSql, [rating, comment, reviewId], (err) => {
            if (err) {
                return next(err);
            }
            res.json({
                status: 'success',
                message: 'Recensione aggiornata con successo'
            });
        });
    });
};

// Cancella recensione (solo chi l'ha creata)
const deleteReview = (req, res, next) => {
    const reviewId = req.params.id;
    const userId = req.user.id;

    const deleteSql = `DELETE FROM reviews WHERE id = ? AND user_id = ?`;
    db.query(deleteSql, [reviewId, userId], (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Recensione non trovata o non autorizzato'
            });
        }
        res.status(204).json({
            status: 'success',
            message: 'Recensione eliminata'
        });
    });
};

// Ottieni tutte le recensioni di un utente
const getUserReviews = (req, res, next) => {
    const userId = req.user.id;

    const sql = `
        SELECT r.id, r.movie_id, r.comment, r.rating, m.title AS movie_title
        FROM reviews r
        JOIN movies m ON r.movie_id = m.id
        WHERE r.user_id = ?
        ORDER BY r.id DESC
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) return next(err);
        res.json(results);
    });
};

module.exports = {
    getAllReviews,
    getReviewsByMovieId,
    createReview,
    updateReview,
    deleteReview,
    getUserReviews,
};