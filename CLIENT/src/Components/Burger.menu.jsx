import { Link } from "react-router-dom";
import { UserContext } from "../hooks/UserContextProvider";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
function BurgerMenu({ setIsOpenBurger }) {
  const user = useContext(UserContext);

  const handleLogout = (event) => {
    event.preventDefault();
    setIsOpenBurger(false);

    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/auth/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur de déconnexion");
        return response.json();
      })
      .then(() => user.setUser({}));
  };

  return (
      <nav className="BurgerMenu">

        { user.isAdmin === 1 && <Link to="/admin" onClick={() => setIsOpenBurger(false)}>Admin</Link>}

        <Link to="/" onClick={() => setIsOpenBurger(false)}>
          Accueil
        </Link>
        <Link to="/recipes" onClick={() => setIsOpenBurger(false)}>
          Recettes
        </Link>

        {!user?.email ? (
          <>
            <Link to="/login" onClick={() => setIsOpenBurger(false)}>
              Connexion
            </Link>
            <Link to="/register" onClick={() => setIsOpenBurger(false)}>
              Inscription
            </Link>
          </>
        ) : (
          <Link to="" onClick={handleLogout}>
            Déconnexion
          </Link>
        )}
      </nav>
  );
}

export default BurgerMenu;