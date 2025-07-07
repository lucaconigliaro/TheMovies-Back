const validateReview = (req, res, next) => {
    const { movie_id, rating, comment } = req.body;

    // Se è una richiesta POST (creazione), movie_id è obbligatorio
    if (req.method === 'POST') {
        if (!movie_id || typeof movie_id !== 'number') {
            return res.status(400).json({ error: 'movie_id obbligatorio e deve essere un numero' });
        }
    }

    // rating è sempre obbligatorio e da 1 a 5
    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'rating obbligatorio, da 1 a 5' });
    }

    // comment è opzionale ma se presente deve essere stringa
    if (comment && typeof comment !== 'string') {
        return res.status(400).json({ error: 'comment deve essere una stringa' });
    }

    next();
};

module.exports = validateReview;