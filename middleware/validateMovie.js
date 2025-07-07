const validateMovie = ( req, res, next) => {
    const { title, director, year, genre, poster_url } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.statu(400).json({
            status: 'fail',
            message: 'Il titolo è obbligatorio e deve essere valido'
        });
    }
    if ( director && typeof director !== 'string') {
        return res.status(400).json({
            status: 'fail',
            message: 'Regista non valido'
        });
    }
    if (year && (!/^\d{4}$/.test(year) || year < 1800 || year > new Date().getFullYear())) {
        return res.status(400).json({ 
            status: 'fail', 
            message: 'Anno non valido'
        });
    }
    if (genre && typeof genre !== 'string') {
        return res.status(400).json ({
            status: 'fail',
            message: 'Genere non valido'
        });
    }
    if (poster_url && typeof poster_url !== 'string') {
        return res.status(400).json({
            status: 'fail',
            message: 'Poster_url deve essere valido'
        });
    }

    next();
};

module.exports = validateMovie;