import Query from "./Query.js";

class Recipe {
    // Récupérer toutes les recettes
    static async getAll () {
        const query = `
        SELECT r.id, title, description, release_date, picture,
               alt, preparation_time, number_people,
               difficulty, users_id, categories_id,
               quantity, name, measure
        FROM recipes as r
        JOIN ingredients_recipes as ir ON r.id = ir.recipes_id
        JOIN ingredients as i ON i.id = ir.ingredients.id    
        `;
        const response = await Query.run(query);
        return response;
    }

    // Ajouter une nouvelle recette
    static async add (data) {
        const response = await Query.runWithParams(
            `INSERT INTO recipes (title, description,
             release_date, picture, alt, preparation_time,
             number_people, difficulty, users_id, categories_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             `,
            [
                data.title,
                data.description,
                data.release_date,
                data.picture,
                data.alt,
                data.preparation_time,
                data.number_people,
                data.difficulty,
                data.users_id,
                data.categories_id
            ]
        );
        return response;
    }

    // Récupérer une recette spécifique par ID
    static async getOneById (id) {
        const recipe = await Query.runWithParams(
            "SELECT * FROM recipes WHERE id = ?",
            [id]
        );
        return recipe;
    }

    // Mettre à jour une recette spécifique par ID
    static async update (data) {
        const response = await Query.runWithParams(
            `UPDATE recipes 
            SET title = ?, description = ?, release_date = ?, picture = ?, alt = ?, preparation_time = ?, number_people = ?, difficulty = ?, users_id = ?, categories_id = ? 
            WHERE id = ?`,
            [
                data.title,
                data.description,
                data.release_date,
                data.picture,
                data.alt,
                data.preparation_time,
                data.number_people,
                data.difficulty,
                data.users_id,
                data.categories_id,
                data.id
            ]
        );
        return response;
    }

    // Supprimer une recette spécifique par ID
    static async remove (id) {
        const response = await Query.runWithParams(
            "DELETE FROM recipes WHERE id = ?",
            [id]
        );
        return response;
    }
};

export default Recipe;