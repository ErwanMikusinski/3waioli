import UserModel from "../model/User.js";

const register = async (req, res) => {
    try {
        const result = await UserModel.register(req.body);
        req.session.user = { 
            id: result.insertId,
            username: req.body.username,
            email: req.body.email,
            isAdmin: 0
        };
        res.status(201).json({ message: "Inscription réussie", user: req.session.user });
    } catch (error) {
        res.status(500).json({ message: "Erreur de serveur", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const result = await UserModel.login(req.body);
        req.session.user = {
            id: result.id,
            username: result.username,
            email: result.email,
            isAdmin: result.isAdmin
         };
        res.status(201).json({ message: "Connexion réussie", user: req.session.user });
    } catch (error) {
        res.status(500).json({ message: "Erreur de connexion", error: error.message });
    }
};

const logout = async (req, res) => {   
    req.session.destroy((err) => {
        if(err){
            return res.status(500).json({message: "Erreur de serveur"});
        }
        res.clearCookie("session_id");
        res.status(200).json({message: "Déconnexion réussie"});
    });
};

export { register, login , logout };