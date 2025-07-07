const db = require('../config/db');

// Index di tutti i film
const getAllMovies = (req, res, next) => {
    const { title, genre, year } = req.query;

    let sql = `
        SELECT m.*, 
            IFNULL(AVG(r.rating), 0) AS average_rating,
            COUNT(r.id) AS total_reviews
        FROM movies m
        LEFT JOIN reviews r ON m.id = r.movie_id
    `;

    const conditions = [];
    const params = [];

    if (title) {
        conditions.push(`m.title LIKE ?`);
        params.push(`%${title}%`);
    }
    if (genre) {
        conditions.push(`m.genre LIKE ?`);
        params.push(`%${genre}%`);
    }
    if (year) {
        conditions.push(`m.year = ?`);
        params.push(year);
    }

    if (conditions.length > 0) {
        sql += ` WHERE ` + conditions.join(' AND ');
    }

    sql += `
        GROUP BY m.id
        ORDER BY m.title ASC
    `;

    db.query(sql, params, (err, results) => {
        if (err) {
            return next(err);
        }
        res.json(results);
    });
};

// Mostra film tramide Id
const getMovieById = (req, res, next) => {
    const movieId = req.params.id;

    const movieSql = "SELECT * FROM movies WHERE id = ?";
    const reviewsSql = `
    SELECT r.id, r.rating, r.comment, r.created_at, r.user_id, u.username
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.movie_id = ?
    ORDER BY r.created_at DESC
    `;

    db.query(movieSql, [movieId], (err, movieResults) => {
        if (err) {
            return next(err);
        }
        if (movieResults.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Film non trovato',
            });
        }
        db.query(reviewsSql, [movieId], (err, reviewResults) => {
            if (err) return next(err);
            res.status(200).json({
                status: 'success',
                data: {
                    ...movieResults[0],
                    reviews: reviewResults,
                }
            });
        });
    });
};

// Aggiungi nuovo film
const createMovie = (req, res, next) => {
    const { title, director, year, genre, poster_url } = req.body;

    const sql = `
    INSERT INTO movies (title, director, year, genre, poster_url) values (?, ?, ?, ?, ?)
    `;

    db.query(sql, [title, director, year, genre, poster_url], (err, results) => {
        if (err) {
            return next(err);
        }
        res.status(201).json({
            status: 'success',
            data: {
                id: results.insertId,
                title,
                director,
                year,
                genre,
                poster_url,
            }
        });
    });
};

// Modifica film
const updateMovie = (req, res, next) => {
    const movieId = req.params.id;
    const { title, director, year, genre, poster_url } = req.body;

    const sql = `
    UPDATE movies 
    SET title = ?, director = ?, year = ?, genre = ?, poster_url = ? 
    WHERE id = ?
    `;

    db.query(sql, [title, director, year, genre, poster_url, movieId], (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Film non trovato',
            });
        }
        res.status(200).json({
            message: 'Film aggiornato con successo',
        });
    });
};

// Rimuovi film
const deleteMovie = (req, res, next) => {
    const movieId = req.params.id;

    const sql = `DELETE FROM movies WHERE id = ?`;

    db.query(sql, [movieId], (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'Film non trovato',
            });
        }
        res.status(204).end();
    });
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};