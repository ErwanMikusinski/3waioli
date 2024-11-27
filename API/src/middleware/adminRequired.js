export default (req, res, next) => {
    
    if (!req.session.user || !req.session.user.isAdmin) {
        
        res.status(403).json({message: "Vous n'êtes pas autorisé à effectuer cette action"});
        
        return;
    }
   
    if(req.session.user.isAdmin){
        
        next();
    } 
}