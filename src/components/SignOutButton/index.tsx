import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <button className={styles.button} onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
