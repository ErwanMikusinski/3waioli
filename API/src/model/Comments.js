import Query from "./Query.js"

class Comments {

    static async addComment(data) {
        const response = await Query.runWithParams(
            "INSERT INTO comments (comment, users_id, recipes_id) VALUES (?, ?, ?)",
             data
        );
        return response;
    }

    static async getCommentById(id) {

        const query = `
            SELECT comments.id, comments.users_id, recipes_id, users.username, comments.comment
            FROM comments
            JOIN users ON users.id = comments.users_id
            JOIN recipes ON recipes.id = comments.recipes_id
            WHERE recipes.id = ?
        `;

        const response = await Query.runWithParams(query, [id]);
        return response;
    }
    static async deleteComment(id, userId) {
        const response = await Query.runWithParams(
            `DELETE FROM comments WHERE id = ? AND users_id = ? `,
            [id, userId]
        );
        return response;
    }
};

export default Comments;