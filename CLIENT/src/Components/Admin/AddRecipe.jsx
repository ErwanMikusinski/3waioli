import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_URL_BACKEND}/api/v1/recipes`;

export default function AddRecipe() {
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

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addRecipe = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la recette");
      }
      toast.success("Recette ajoutée avec succès");
      navigate("/admin");
    } catch (error) {
      toast.error(error.message || "Une erreur est survenue");
    }
  };

  return (
    <div>
      <h2>Ajouter une nouvelle recette</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addRecipe();
        }}
      >
        <div>
          <label>Titre :</label>
          <input
            type="text"
            name="title"
            maxLength="30"
            placeholder="Titre de la recette"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description :</label>
          <textarea
            name="description"
            placeholder="Description de la recette"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Date de publication :</label>
          <input
            type="datetime-local"
            name="release_date"
            value={formData.release_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image (URL) :</label>
          <input
            type="text"
            name="picture"
            maxLength="50"
            placeholder="Lien de l'image"
            value={formData.picture}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Texte alternatif :</label>
          <input
            type="text"
            name="alt"
            maxLength="250"
            placeholder="Texte alternatif pour l'image"
            value={formData.alt}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Temps de préparation :</label>
          <input
            type="time"
            name="preparation_time"
            value={formData.preparation_time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Nombre de personnes :</label>
          <input
            type="number"
            name="number_people"
            placeholder="Nombre de personnes"
            value={formData.number_people}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Difficulté :</label>
          <input
            type="text"
            name="difficulty"
            maxLength="50"
            placeholder="Niveau de difficulté"
            value={formData.difficulty}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Méthode de préparation :</label>
          <textarea
            name="preparation_method"
            placeholder="Méthode de préparation"
            value={formData.preparation_method}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}
