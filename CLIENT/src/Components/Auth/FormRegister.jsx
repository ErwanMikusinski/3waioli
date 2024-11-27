import { useState } from "react";
import { useUser } from "../../hooks/UserContextProvider";

function FormRegister() {
  const context = useUser();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [erreurMessage, setErreurMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${import.meta.env.VITE_URL_BACKEND}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erreur d'inscription");
        return response.json();
      })
      .then((data) => {
        context.setUser(data.user);
        window.location.href = "/";
      })
      .catch((err) => setErreurMessage(err.message));
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      <p>{erreurMessage}</p>
    </>
  );
}

export default FormRegister;