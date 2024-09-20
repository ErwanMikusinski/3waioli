// Exportation d'une fonction middleware par défaut
export default (req, res, next) => {
    // Vérification si l'objet session ne contient pas de propriété user
    if (!req.session.user ) {
        // Si l'utilisateur n'est pas connecté, renvoyer une réponse avec le statut 403 (Forbidden)
        res.status(403).json({message: "Vous devez être connecté pour effectuer cette action !"});
        // Terminer la fonction pour éviter d'appeler next()
        return;
    }
    // Si l'utilisateur est connecté (req.session.user existe)
    if(req.session.user){
        // Appeler le middleware suivant dans la chaîne
        next();
    } 
}