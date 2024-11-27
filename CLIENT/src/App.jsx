import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useUser } from "./hooks/UserContextProvider";
import ProtectedRoute from "./Hoc/AdminHoc";


import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/register";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Recipes from "./Pages/Recipes";
import RecipesDetail from "./Pages/RecipeDetails";
import Admin from "./Pages/Admin";
import AddRecipe from "./Components/Admin/AddRecipe";

function App() {

const user = useUser();
  if (user.statut === 1) {
   return (
    <div>
      <h1>Vous êtes bannis</h1>
    </div>
  );
}

  return (
    <>
    <Toaster position="bottom-right" />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/recipes" element={<Recipes/>} />
        <Route path="/recipes/:id" element={<RecipesDetail />} />
        <Route path="/admin" element={<ProtectedRoute component={Admin} />} />
        <Route path="/add-recipe" element={<ProtectedRoute component={AddRecipe} />} />

        <Route path="*" element={<p>NOT FOUND</p>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;