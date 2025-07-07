const db = require('../config/db');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

// Signup
const signup = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Username e password obbligatori'
        });
    }

    // Controlla che username e password siano forniti
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err);
        }

        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(sql, [username, hashedPassword], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({
                        status: 'fail',
                        message: 'Username già in uso'
                    });
                }
                return next(err);
            }

            const token = generateToken({ id: results.insertId, username });
            // Mando token e user in risposta
            res.status(201).json({
                status: 'success',
                token,
                user: {
                    id: results.insertId,
                    username,
                },
            });
        });
    });
};

// Login
const login = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Username e password obbligatori'
        });
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.length === 0) {
            return res.status(401).json({
                status: 'fail',
                message: 'Credenziali errate'
            });
        }

        const user = results[0];

        // Verifica la password fornita con quella salvata nel database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return next(err);
            }
            if (!isMatch) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'Credenziali errate'
                });
            }

            const token = generateToken({ id: user.id, username: user.username });
            // Ritorna anche i dati utente oltre al token
            res.json({ status: 'success', token, user: { id: user.id, username: user.username } });
        });
    });
};

// Funzione per verificare il token
const verifyToken = (req, res) => {
    res.json({ status: 'success', user: req.user });
};

module.exports = {
    signup,
    login,
    verifyToken,
};