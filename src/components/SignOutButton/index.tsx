import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import styles from "./styles.module.css";

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut(auth);
  };
  return (
    <button className={styles.button} onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
