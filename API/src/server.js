// Importation du module dotenv pour charger les variables d'environnement à partir d'un fichier .env
import "dotenv/config";

// Importation de createRequire pour permettre l'utilisation de require dans un module ES6
import { createRequire } from "module";

// Importation des modules express, express-session et cors
import express from "express";
import session from "express-session";
import cors from "cors";

// Importation du pool de connexions à la base de données depuis le fichier de configuration
import pool from "./config/db.js";

// Importation du routeur depuis le fichier de routes
import router from "./router/index.routes.js";

// Création d'un objet require pour pouvoir utiliser require dans un module ES6
const require = createRequire(import.meta.url);

// Importation de express-mysql-session pour stocker les sessions dans une base de données MySQL
const MySQLStore = require("express-mysql-session")(session);

// Création d'une application Express
const app = express();

// Configuration des options CORS
const corsOptions = cors({
	origin: "http://localhost:5173", // URL autorisée à faire des requêtes CORS
	credentials: true, // Autorisation d'envoyer des cookies dans les requêtes CORS
});

// Création d'un store de sessions MySQL avec des options pour la gestion des expirations
const sessionStore = new MySQLStore(
	{
		clearExpired: true, // Suppression des sessions expirées
		checkExpirationInterval: 900000, // Intervalle pour vérifier les expirations (15 minutes)
		expiration: 3600000, // Durée de vie des sessions (1 heure)
	},
	pool // Utilisation du pool de connexions pour se connecter à la base de données
);

// Configuration de la session pour l'application Express
const newSession = session({
	name: "session_id", // Nom du cookie de session
	secret: process.env.SECRET_SESSION, // Secret pour signer le cookie de session
	resave: false, // Ne pas enregistrer la session si elle n'a pas été modifiée
	saveUninitialized: false, // Ne pas sauvegarder les sessions non initialisées
	store: sessionStore, // Utilisation du store de sessions MySQL
	cookie: {
		secure: false, // Le cookie n'est pas sécurisé (devrait être true en production avec HTTPS)
		httpOnly: true, // Le cookie n'est accessible que par le protocole HTTP(S), pas par JavaScript
		sameSite: "lax", // Le cookie est envoyé uniquement pour les mêmes sites ou les navigations de premier plan
		maxAge: 3600000, // Durée de vie du cookie (1 heure)
		domain: "localhost", // Domaine pour lequel le cookie est valide
	},
	rolling: true, // Réinitialiser l'horloge de la session à chaque requête
});

// Application des options CORS à toutes les requêtes
app.use(corsOptions);

// Application de la configuration de la session à l'application Express
app.use(newSession);

// Middleware pour parser les corps des requêtes en JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques depuis le dossier "public"
app.use(express.static("public"));

// Utilisation du routeur pour gérer les routes de l'application
app.use(router);

// Démarrage du serveur sur le port défini dans les variables d'environnement
app.listen(process.env.LOCAL_PORT, () => {
	console.log("Server is running at http://localhost:" + process.env.LOCAL_PORT);
});
