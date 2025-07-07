const validateFavorite = (req, res, next) => {
    const { movie_id } = req.body;
  
    if (!movie_id || typeof movie_id !== 'number') {
      return res.status(400).json({ error: 'movie_id è obbligatorio e deve essere un numero' });
    }
  
    next();
  };

  module.exports = validateFavorite;