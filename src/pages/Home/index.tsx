import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/signup");
  };

  const token = localStorage.getItem("token");

  return (
    <>
      <div className={styles.videoBackground}>
        <video autoPlay muted loop playsInline>
          <source src="public/images/fondoHome.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de videos.
        </video>
      </div>
      <div className={styles.contenedor}>
        <h2>CULTIVATE</h2>
        <h1>INTELLIGENTLY</h1>
        <p>
          Optimize and improve your crops with our innovative platform that
          combines technology and simplicity.
        </p>
        {!token && (
          <button type="button" className={styles.StartButton} onClick={handleStart}>
            Get Started
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
