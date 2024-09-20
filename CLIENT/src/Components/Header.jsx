import { useContext, useState } from "react"; // Importation des hooks React
import { Link } from "react-router-dom"; // Importation du composant Link pour la navigation
import { UserContext } from "../hooks/UserContextProvider"; // Importation du contexte utilisateur
import BurgerIcon from "./Burger.icon"; // Importation du composant BurgerIcon
import BurgerMenu from "./Burger.menu"; // Importation du composant BurgerMenu

function Header() {
  const user = useContext(UserContext); // Récupération des informations utilisateur depuis le contexte
  const [isOpenBurger, setIsOpenBurger] = useState(false); // État pour gérer l'ouverture/fermeture du menu burger

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = (event) => {
    event.preventDefault();

    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/auth/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw "error"; // Gestion des erreurs
        return response.json();
      })
      .then(() => user.setUser({})); // Réinitialisation de l'état utilisateur après déconnexion
  };

  // Fonction pour gérer l'ouverture/fermeture du menu burger
  const handleBurger = () => {
    setIsOpenBurger((value) => !value);
  };
  return (
    <header className="header">
      <h1>3WAÏOLI</h1> {/* Titre de l'en-tête */}
      <BurgerIcon className="BurgerIcon" onClick={handleBurger} />{" "}
      {/* Icône du menu burger */}
      {/* Menu burger conditionnellement affiché */}
      {isOpenBurger && <BurgerMenu setIsOpenBurger={setIsOpenBurger} />}
      <nav className="HeaderNav">
         { user.isAdmin === 1 && <Link to="/admin">Admin</Link>}
        <Link to="/">Accueil</Link> {/* Lien vers la page d'accueil */}
        <Link to="/recipes">Recettes</Link> {/* Lien vers la page Recettes */}
        {!user?.email ? ( // Vérifie si l'utilisateur est connecté
          <>
            <Link to="/login">Connexion</Link>{" "}
            {/* Lien vers la page de connexion */}
            <Link to="/register">Inscription</Link>{" "}
            {/* Lien vers la page d'inscription */}
          </>
        ) : (
          <Link to="" onClick={handleLogout}>
            {" "}
            {/* Lien pour la déconnexion */}
            Déconnexion
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;