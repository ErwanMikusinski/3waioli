// Importation du module mysql2/promise pour utiliser MySQL avec des promesses
import mysql from "mysql2/promise";

// Création d'une pool de connexions à la base de données avec les paramètres fournis
const pool = mysql.createPool({
    host: process.env.DB_HOST, // Hôte de la base de données, défini par une variable d'environnement
    database: process.env.DB_NAME, // Nom de la base de données, défini par une variable d'environnement
    user: process.env.DB_USER, // Nom d'utilisateur pour la base de données, défini par une variable d'environnement
    password: process.env.DB_PASS, // Mot de passe pour la base de données, défini par une variable d'environnement
    waitForConnections: true, // Indique si le pool doit attendre les connexions disponibles lorsqu'il est plein
    connectionLimit: 10, // Nombre maximum de connexions dans le pool
    queueLimit: 0, // Nombre maximum de requêtes en file d'attente (0 signifie pas de limite)
});

// Obtention d'une connexion à partir du pool
pool.getConnection()
    .then((res) => {
        // Si la connexion est réussie, afficher un message indiquant le succès
        console.log("Connected to the database " + res.config.database);
        // Libération de la connexion pour la remettre dans le pool
        pool.releaseConnection(res);
    })
    .catch((err) => 
        // Si une erreur se produit lors de la connexion, afficher un message d'erreur
        console.error("Error while connecting to the database " + err.message)
    );

// Exportation du pool de connexions pour être utilisé dans d'autres parties de l'application
export default pool;