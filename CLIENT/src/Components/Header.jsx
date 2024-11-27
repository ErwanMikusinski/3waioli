import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/UserContextProvider";
import BurgerIcon from "./Burger.icon";
import BurgerMenu from "./Burger.menu";

function Header() {
  const user = useUser();
  const [isOpenBurger, setIsOpenBurger] = useState(false);

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
        if (!response.ok) throw "error";
        return response.json();
      })
      .then(() => user.setUser({}));
  };

 
  const handleBurger = () => {
    setIsOpenBurger((value) => !value);
  };
  return (
    <header className="header">
      <h1>3WAÏOLI</h1>
      <BurgerIcon className="BurgerIcon" onClick={handleBurger} />
      {isOpenBurger && <BurgerMenu setIsOpenBurger={setIsOpenBurger} />}
      <nav className="HeaderNav">
         { user.isAdmin === 1 && <Link to="/admin">Admin</Link>}
        <Link to="/">Accueil</Link>
        <Link to="/recipes">Recettes</Link>
        {!user?.email ? (
          <>
            <Link to="/login">Connexion</Link>{" "}
            <Link to="/register">Inscription</Link>{" "}
          </>
        ) : (
          <Link to="" onClick={handleLogout}>
            Déconnexion
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;