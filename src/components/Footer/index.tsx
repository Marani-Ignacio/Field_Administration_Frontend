import styles from "./styles.module.css";

const Footer = () => {
  return  <footer className={styles.footer}>
  <a href="https://github.com/Marani-Ignacio/Field_App" target="_blank" rel="noopener noreferrer">
  <img src="public/images/github.png" alt="Github" className={styles.icon} />
  </a>
</footer>
};

export default Footer;
