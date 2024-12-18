import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../Components/Comment.jsx";

function RecipesDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/recipes/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des détails de la recette"
          );
        }
        return response.json();
      })
      .then((data) => {
        setRecipe(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <p>Chargement des détails...</p>;
  }

  if (error) {
    return <p>Erreur: {error}</p>;
  }

  if (!recipe) {
    return <p>Recette non trouvée</p>;
  }

  const preparationSteps = recipe.preparation_method
    .split(".")
    .filter((step) => step.trim() !== "");

  return (
    <div className="recipes-detail">
      <h1>{recipe.title}</h1>
      <img
        src={`${import.meta.env.VITE_URL_BACKEND}/images/${recipe.picture}`}
        alt={recipe.alt}
      />
      <div className="recipe-content">
        {" "}
        <div className="ingredients">
          {" "}
          <h2>Ingrédients</h2>
          <ul>
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient) => (
                <li key={ingredient.name}>
                  {ingredient.quantity} {ingredient.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="preparation-method">
          {" "}
          <h2>Méthode de préparation</h2>
          <ol>
            {preparationSteps.map((step, index) => (
              <li key={index}>{step.trim()}</li>
            ))}
          </ol>
        </div>
      </div>

      <Comment recipeId={id} />
    </div>
  );
}

export default RecipesDetail;
