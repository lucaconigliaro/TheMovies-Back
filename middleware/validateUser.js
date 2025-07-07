const validateUser = (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || typeof username !== 'string') {
      return res.status(400).json({ error: 'username è obbligatorio' });
    }
  
    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ error: 'password è obbligatoria e deve avere almeno 6 caratteri' });
    }
  
    next();
  };

  module.exports = validateUser;