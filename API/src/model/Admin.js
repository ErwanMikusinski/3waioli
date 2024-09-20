import Query from "../model/Query.js";

class Admin {

  static async userBan(id) {

    const response = await Query.runWithParams(`
        UPDATE users SET statut = 1 
        WHERE id = ?`,[id]
    );
    return response;
  }

  static async commentDelete(id) {

    const response = await Query.runWithParams(`
        DELETE FROM comments 
        WHERE id = ?`,[id]
    );
    return response;
  }

  static async getAllReport() {

    try {

    const response = await Query.run(`
        SELECT username, users.id AS user_id, comment, comments.id, recipes.title
        FROM comments 
        JOIN users ON users.id = comments.users_id
        JOIN recipes ON recipes.id = comments.recipes_id
        WHERE is_report = 0`
    );
    return response;
  }
  catch (err){
    console.log(err);
  }
}
};

export default Admin;