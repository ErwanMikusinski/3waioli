import { createContext, useEffect, useState } from "react"; // Importation des hooks et des fonctionnalités React

// Création du contexte utilisateur avec des valeurs par défaut
export const UserContext = createContext({
  username: "",
  email: "",
  statut: 1,
  isAdmin: 0,
  setUser: () => null,
});

// eslint-disable-next-line react/prop-types
function UserContextProvider({ children }) {
  const [user, setUser] = useState({}); // État pour stocker les informations de l'utilisateur

  // Effet pour récupérer les informations de l'utilisateur lors du chargement du composant
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/auth`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw "error"; // Gestion des erreurs si la réponse n'est pas OK
        return response.json();
      })
      .then((data) => setUser(data.user)); // Mise à jour de l'état avec les données utilisateur
  }, []); // Dépendances vides pour que l'effet s'exécute une seule fois au chargement

  return (
    <UserContext.Provider
      value={{
        ...user, // Étend l'objet utilisateur avec les propriétés actuelles
        setUser, // Fournit la fonction pour mettre à jour l'utilisateur
      }}
    >
      {children} {/* Rend les enfants du contexte accessibles */}
    </UserContext.Provider>
  );
}

export default UserContextProvider;