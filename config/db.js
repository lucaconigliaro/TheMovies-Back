const mysql = require('mysql2');

// Configurazione connessione al database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test connessione DB
db.connect((err) => {
    if (err) {
      console.error("Errore connessione DB:", err.message);  
    } else {
        console.log("Connesso al database ✅");
    }
});

module.exports = db;