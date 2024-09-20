import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/recipes`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des recettes");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Chargement des recettes...</p>;
  }

  if (error) {
    return <p>Erreur: {error}</p>;
  }
  return (
    <div>
      <h1>Nos Recettes</h1>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={ `${import.meta.env.VITE_URL_BACKEND}/images/${recipe.picture}`} alt={recipe.alt} />
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <p>Temps de préparation: {recipe.preparation_time} minutes</p>
            <p>Difficulté: {recipe.difficulty}</p>
            <p>Pour {recipe.number_people} personnes</p>
            <p>Date de publication: {new Date(recipe.release_date).toLocaleDateString()}</p>
            <Link to={`/recipes/${recipe.id}`}>Voir les détails</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
