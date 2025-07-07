Milestone 1: Setup iniziale e DB connection

Obiettivi:
	• ✅	Creare repo e progetto Node.js + React
	• ✅	Configurare file .env e dotenv
	• ✅	Configurare connessione MySQL con mysql2 e db.connection()
	• ✅	Creare schema database (tabelle movies, users, reviews, ecc)
	• ✅	Popolare DB con 10 film di test

Passaggi:
	1.	git init e crea repo
	2.	npm init -y e installa dipendenze backend (express, mysql2, dotenv, cors, nodemon)
	3.	Crea file .env con variabili DB (host, user, password, db_name)
	4.	Crea db.js con mysql2.createConnection() e lettura variabili da .env
	5.	Configura server Express in index.js con cors e start server
	6.	Crea schema DB con MySQL Workbench (tabelle necessarie, chiavi primarie/esterne)
	7.	Popola tabella movies con 10 film di test (vedi elenco che ti do dopo)
	8.	Verifica connessione e prova query di selezione SELECT * FROM movies su endpoint API /movies

⸻

Milestone 2: Backend REST API - Movies

Obiettivi:
	•	Costruire controller per gestione film (getAll, getOne, create, update, delete)
	•	Validazioni base sui dati in entrata
	•	Gestione errori in modo professionale (try/catch o callback con next)
	•	Collegare rotte in Express (routes/movies.js + import su index.js)
	•	Test API con Postman

Passaggi:
	1.	Crea controllers/movieController.js con funzioni: getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie
	2.	Usa db.connection.query() con parametri e gestione errori
	3.	Gestisci paginazione e filtri semplici (es. ricerca titolo)
	4.	Crea routes/movies.js e collega rotte REST standard (GET, POST, PUT, DELETE)
	5.	Importa e usa movies routes in index.js
	6.	Testa tutte le rotte con Postman (check risposta corretta, errori, status code)

⸻

Milestone 3: Backend Utenti e Autenticazione (solo username e password)

Obiettivi:
	•	Creare tabella utenti (id, username, password hash)
	•	Gestire registrazione e login con bcrypt e jsonwebtoken
	•	Validare dati in input e hash password in registrazione
	•	Proteggere rotte con middleware JWT
	•	Test API autenticazione

Passaggi:
	1.	Crea tabella users in DB
	2.	Implementa authController.js con:
	•	registerUser (bcrypt hash password)
	•	loginUser (bcrypt compare + JWT sign)
	3.	Middleware authMiddleware.js per proteggere rotte
	4.	Aggiungi rotte POST /register, POST /login
	5.	Proteggi rotte sensibili (es. aggiunta recensioni) usando middleware
	6.	Test API autenticazione con Postman

⸻

Milestone 4: Backend Reviews

Obiettivi:
	•	Tabella reviews collegata a utenti e film
	•	CRUD recensioni (solo utenti autenticati possono creare)
	•	Validazioni voto e testo recensione
	•	Collegare dati film con recensioni in response dettagliata

Passaggi:
	1.	Crea tabella reviews
	2.	Implementa reviewsController.js con funzioni per gestire recensioni
	3.	Collega rotte reviews a film specifici (/movies/:id/reviews)
	4.	Proteggi rotte create/update/delete con auth middleware
	5.	Test funzionalità con Postman

⸻

Milestone 5: Frontend React base

Obiettivi:
	•	Setup React app con CRA o Vite
	•	Struttura base pagine e routing (React Router)
	•	Pagine principali: lista film, dettaglio film, login, registrazione
	•	Chiamate API (fetch/axios) per mostrare dati backend

Passaggi:
	1.	npx create-react-app o vite create
	2.	Installa dipendenze utili (react-router-dom, axios)
	3.	Configura routing base
	4.	Crea componenti per visualizzare film e dettagli
	5.	Implementa form login e registrazione con gestione stato e validazioni
	6.	Collegati al backend per visualizzare dati dinamici

⸻

Milestone 6: Frontend avanzato e miglioramenti

Obiettivi:
	•	Protezione rotte frontend (es. pagine private dopo login)
	•	Gestione token JWT nel frontend (localStorage/sessionStorage)
	•	Funzionalità recensioni (aggiunta, visualizzazione)
	•	Styling base con CSS o framework (Bootstrap, Tailwind)
	•	Pulizia codice e refactor

Passaggi:
	1.	Implementa gestione token JWT in React (context o Redux)
	2.	Proteggi pagine private con redirect se non loggati
	3.	Crea componenti recensioni con form e lista
	4.	Migliora UI/UX con styling base
	5.	Testing finale e fix bug

⸻
