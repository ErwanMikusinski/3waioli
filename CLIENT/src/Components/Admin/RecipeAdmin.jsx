import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../../assets/style/admin.scss";

const API_URL = `${import.meta.env.VITE_URL_BACKEND}/api/v1/recipes`;

export default function RecipeAdmin() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    release_date: "",
    picture: "",
    alt: "",
    preparation_time: "",
    number_people: "",
    difficulty: "",
    categories_id: "",
    preparation_method: "",
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des recettes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      toast.error(error.message || "Une erreur est survenue");
    }
  };

  const updateRecipe = async (recipeId) => {
    try {
      const response = await fetch(`${API_URL}/${recipeId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de la recette");
      }
      const updated = await response.json();
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === recipeId ? { ...formData, id: recipeId } : recipe
        )
      );
      setEditingRecipeId(null);
      toast.success("Recette mise à jour avec succès");
    } catch (error) {
      toast.error(error.message || "Une erreur est survenue");
    }
  };

  const deleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(`${API_URL}/${recipeId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la recette");
      }
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
      toast.success("Recette supprimée avec succès");
    } catch (error) {
      toast.error(error.message || "Une erreur est survenue");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = (recipe) => {
    setEditingRecipeId(recipe.id);
    setFormData({
      title: recipe.title || "",
      description: recipe.description || "",
      release_date: recipe.release_date
        ? new Date(recipe.release_date).toISOString().split("T")[0]
        : "",
      picture: recipe.picture || "",
      alt: recipe.alt || "",
      preparation_time: recipe.preparation_time || "",
      number_people: recipe.number_people || "",
      difficulty: recipe.difficulty || "",
      categories_id: recipe.categories_id || "",
      preparation_method: recipe.preparation_method || "",
    });
  };

  return (
    <>
      <h2>Gestion des Recettes</h2>
      <Link to="/add-recipe" className="add-recipe-button">
        Ajouter une Recette
      </Link>
      <table>
        <thead>
          <tr>
            <th>Recettes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td>
                {editingRecipeId === recipe.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      name="title"
                      placeholder="Titre"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                    <textarea
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                    <input
                      type="date"
                      name="release_date"
                      value={formData.release_date}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="picture"
                      placeholder="URL de l'image"
                      value={formData.picture}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="alt"
                      placeholder="Texte alternatif"
                      value={formData.alt}
                      onChange={handleInputChange}
                    />
                    <input
                      type="time"
                      name="preparation_time"
                      placeholder="Temps de préparation (min)"
                      value={formData.preparation_time}
                      onChange={handleInputChange}
                    />
                    <input
                      type="number"
                      name="number_people"
                      placeholder="Nombre de personnes"
                      value={formData.number_people}
                      onChange={handleInputChange}
                    />
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                    >
                      <option value="">Difficulté</option>
                      <option value="Facile">Facile</option>
                      <option value="Moyen">Moyen</option>
                      <option value="Difficile">Difficile</option>
                    </select>
                    <input
                      type="text"
                      name="categories_id"
                      placeholder="ID des catégories"
                      value={formData.categories_id}
                      onChange={handleInputChange}
                    />
                    <textarea
                      name="preparation_method"
                      placeholder="Méthode de préparation"
                      value={formData.preparation_method}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                ) : (
                  <p>{recipe.title}</p>
                )}
              </td>
              <td>
                {editingRecipeId === recipe.id ? (
                  <>
                    <button onClick={() => updateRecipe(recipe.id)}>
                      Sauvegarder
                    </button>
                    <button onClick={() => setEditingRecipeId(null)}>
                      Annuler
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(recipe)}>
                      Éditer
                    </button>
                    <button onClick={() => deleteRecipe(recipe.id)}>
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
