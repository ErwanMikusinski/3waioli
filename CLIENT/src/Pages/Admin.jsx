import { useContext, useState } from "react";
import { UserContext } from "../hooks/UserContextProvider";
import RecipeAdmin from "../Components/Admin/RecipeAdmin";
import CommentAdmin from "../Components/Admin/CommentAdmin";

export default function Admin() {
  const [tabName, setTabName] = useState("recipes");
  const users = useContext(UserContext);

  if (!users?.email || users?.isAdmin === 0) {
    window.location.href = "/";
    return null;
  }

  return (
    <main className="admin-panel">
      <h1>Panneau d&apos;administration</h1>

      <nav>
        <button onClick={() => setTabName("comments")}>Commentaires</button>
        <button onClick={() => setTabName("recipes")}>Recettes</button>
      </nav>
    
      {tabName === "comments" && <CommentAdmin />}
      {tabName === "recipes" && <RecipeAdmin />}

    </main>
  );
}
