import Query from "./Query.js";

class Recipe {

    static async getAll () {
        try {
        const query = `
        SELECT r.id, title, description, release_date, picture,
               alt, preparation_time, number_people,
               difficulty, users_id, categories_id, preparation_method
        FROM recipes as r
        `;
        const response = await Query.run(query);
        return response;
        }
        catch (error) {
            console.log(error)
        }
    }

    static async add (data) {
        const response = await Query.runWithParams(
            `INSERT INTO recipes (title, description,
             release_date, picture, alt, preparation_time,
             number_people, difficulty, users_id, categories_id, preparation_method) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                data.categories_id,
                data.preparation_method
            ]
        );
        return response;
    }

    // Récupérer une recette spécifique par ID
    static async getOneById(id) {
        try {
            const query = `
                SELECT r.id, r.title, r.description, r.release_date, r.picture,
                       r.alt, r.preparation_time, r.number_people, r.difficulty, r.preparation_method,
                       i.name as ingredient_name, ir.quantity as ingredient_quantity
                FROM recipes as r
                LEFT JOIN ingredients_recipes as ir ON r.id = ir.recipes_id
                LEFT JOIN ingredients as i ON ir.ingredients_id = i.id
                WHERE r.id = ?
            `;
            const recipeWithIngredients = await Query.runWithParams(query, [id]);
            if (recipeWithIngredients.length === 0) {
                return null;
            }
    
            const recipe = {
                id: recipeWithIngredients[0].id,
                title: recipeWithIngredients[0].title,
                description: recipeWithIngredients[0].description,
                release_date: recipeWithIngredients[0].release_date,
                picture: recipeWithIngredients[0].picture,
                alt: recipeWithIngredients[0].alt,
                preparation_time: recipeWithIngredients[0].preparation_time,
                number_people: recipeWithIngredients[0].number_people,
                difficulty: recipeWithIngredients[0].difficulty,
                preparation_method: recipeWithIngredients[0].preparation_method,
                ingredients: recipeWithIngredients.map(row => ({
                    name: row.ingredient_name,
                    quantity: row.ingredient_quantity,
                }))
            };
            return recipe;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Mettre à jour une recette spécifique par ID
    static async update (data) {
        const response = await Query.runWithParams(
            `UPDATE recipes 
            SET title = ?, description = ?, release_date = ?, picture = ?, alt = ?, preparation_time = ?, number_people = ?, difficulty = ?, preparation_method = ?, users_id = ?, categories_id = ? 
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
                data.preparation_method,
                data.users_id,
                data.categories_id,
                data.id
            ]
        );
        return response;
    }

    static async remove (id) {
        const response = await Query.runWithParams(
            "DELETE FROM recipes WHERE id = ?",
            [id]
        );
        return response;
    }
};

export default Recipe;