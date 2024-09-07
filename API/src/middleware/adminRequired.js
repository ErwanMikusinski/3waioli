export default (req, res, next) => {
    // Si aucun utilisateur n'est connecté ou si l'utilisateur connecté n'est pas un admin
    if (!req.session.user || !req.session.user.isAdmin) {
        // Renvoie une réponse avec le statut 403 (action interdite) et un message d'erreur
        res.status(403).json({message: "Vous n'êtes pas autorisé à effectuer cette action"});
        // Termine la fonction pour éviter d'appeler next()
        return;
    }
    // Si l'utilisateur est connecté et est un admin
    if(req.session.user.isAdmin){
        // Permet de continuer à la prochaine étape de la requête (le controller)
        next();
    } 
}