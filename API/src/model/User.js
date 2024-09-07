import Query from "./Query.js";
import bcrypt from "bcrypt";

class UserModel {

    static async getUser(username, password) {
        const query = "SELECT * FROM users WHERE username = ? AND password = ?";
        const user = await Query.runWithParams(query, { username, password });
        return user;
    }

    static async register(data) {
        const query1 = `
        SELECT * 
        FROM users 
        WHERE email = ?`;

        const existingUser = await Query.runWithParams(query1, { email: data.email });

        if (existingUser.length) {
            throw new Error("Cet utilisateur existe déjà");
        }

        const query2 = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?) `;

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = {
            username: data.username,
            email: data.email,
            password: hashedPassword,
        };

        const result = await Query.runWithParams(query2, newUser);

        if (result.insertId) {
            return result;
        }
        throw new Error("Erreur lors de l'enregistrement de l'utilisateur");
    }

    static async login(data) {
        const query = `
        SELECT * 
        FROM users 
        WHERE email = ?`;

        const users = await Query.runWithParams(query, { email: data.email });

        if (!users.length) {
            throw new Error("Utilisateur non trouvé");
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new Error("Mot de passe incorrect");
        }

        return user;
    }
}

export default UserModel;