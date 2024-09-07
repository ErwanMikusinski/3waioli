import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Components/Pages/Home";
import Auth from "./Components/Pages/Signin";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth/signin" element={<Auth />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;