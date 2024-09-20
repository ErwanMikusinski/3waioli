import "../assets/style/home.scss";

function Home() {
  return (
    <main>
      <h1>
        <span className="italy-green">Bienvenue </span> 
        <span className="italy-white">sur </span> 
        <span className="italy-red">3waïoli</span>
      </h1>

      <p>
      Ce site est né de ma passion pour la cuisine, après des années d'expérience en tant que cuisinier. 
      J'ai créé cet espace pour partager avec vous les recettes qui m'ont accompagné tout au long de mon parcours.
      Que vous soyez novice ou expert, vous trouverez ici des plats variés et inspirants,
      faciles à reproduire chez vous. Mon objectif est de vous faire découvrir de nouvelles saveurs.
      </p>

      <div className="home-image">
        <img src="/img/Img_home.webp" alt="Image d'aliments italien" />
      </div>
    </main>
  );
}

export default Home;
