import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContextProvider";

function FormRegister() {
  // Accès au contexte utilisateur
  const context = useContext(UserContext);

  // État pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // État pour gérer les messages d'erreur
  const [erreurMessage, setErreurMessage] = useState("");

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/auth/register`, {
      method: "POST", // Méthode HTTP POST pour l'inscription
      headers: {
        "Content-Type": "application/json", // En-tête pour indiquer que le corps de la requête est en JSON
      },
      credentials: "include", // Inclut les cookies dans la requête
      body: JSON.stringify(formData), // Convertit les données du formulaire en JSON
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur d'inscription"); // Gère les erreurs de réponse
        return response.json(); // Convertit la réponse en JSON
      })
      .then((data) => {
        context.setUser(data.user); // Met à jour le contexte avec les informations de l'utilisateur
        window.location.href = "/"; // Redirige l'utilisateur vers la page d'accueil
      })
      .catch((err) => setErreurMessage(err.message)); // Affiche les messages d'erreur
  };

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Met à jour l'état en fonction du champ modifié
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form_auth">
        <label htmlFor="username">Votre pseudo</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Choisissez votre pseudo"
          onChange={handleInputChange}
          value={formData.username}
        />

        <label htmlFor="email">Adresse email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Votre email"
          onChange={handleInputChange}
          value={formData.email}
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Votre mot de passe"
          onChange={handleInputChange}
          value={formData.password}
        />

        <input type="submit" value="S'inscrire" />
      </form>
      <p>{erreurMessage}</p> {/* Affiche le message d'erreur, s'il y en a */}
    </>
  );
}

export default FormRegister;