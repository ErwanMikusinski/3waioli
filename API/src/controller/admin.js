import Admin from "../model/Admin.js"

const userBan = async (req, res) => {
    const {id} = req.params
    const response = await Admin.userBan(id)
    if (response.affectedRows > 0) {
        res.json({ msg: `Utilisateur bien supprimé` });
    } else {
        
        res.status(404).json({ msg: "Error" });
    }
};

const commentDelete = async (req, res) => {
    const {id} = req.params
    const response = await Admin.commentDelete(id)
    if (response.affectedRows > 0) {
        res.json({ msg: `Commentaire bien supprimé` });
    } else {
        
        res.status(404).json({ msg: "Error" });
    }
    
};

const getAllReport = async (req, res) => {
    const response = await Admin.getAllReport() 
    res.json(response);
};

export {userBan, commentDelete, getAllReport};