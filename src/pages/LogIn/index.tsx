import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { logInSchema } from "./validations";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

type FormValues = {
  email: string;
  password: string;
};

const LogIn = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: joiResolver(logInSchema),
  });

  const handleLogIn = handleSubmit(async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  });

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogIn} className={styles.form}>
        <div className={styles.formGroup}>
          <h1>Hello again!</h1>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            {...register("email")}
          />
          {errors?.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={styles.input}
            {...register("password")}
          />
          {errors?.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className={styles.button}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
