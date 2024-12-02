import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { joiResolver } from "@hookform/resolvers/joi";
import { signUpSchema } from "./validations";
import { useDispatch } from "../../store/store";
import { postUser } from "../../slices/users";
import { User } from "../../types/users";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

type FormValues = Omit<User, "firebaseUid" | "id"> & {
  password: string;
  repeatPassword: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: joiResolver(signUpSchema),
  });

  const handleSignUp = handleSubmit(async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const firebaseUid = userCredential.user.uid;

      const newUser: User = {
        name: data.name,
        lastName: data.lastName,
        birthDate: new Date(data.birthDate),
        email: data.email,
        dni: data.dni,
        isAdmin: false,
        firebaseUid,
      };

      await dispatch(postUser(newUser));
      navigate("/");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSignUp} className={styles.form}>
        <div className={styles.formGroup}>
          <h1>Create new account</h1>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            id="name"
            type="text"
            className={styles.input}
            {...register("name")}
          />
          {errors?.name && (
            <p className={styles.error}>{errors.name.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className={styles.input}
            {...register("lastName")}
          />
          {errors?.lastName && (
            <p className={styles.error}>{errors.lastName.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
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
        <div className={styles.formGroup}>
          <label htmlFor="repeatPassword" className={styles.label}>
            Repeat Password
          </label>
          <input
            id="repeatPassword"
            type="password"
            className={styles.input}
            {...register("repeatPassword")}
          />
          {errors?.repeatPassword && (
            <p className={styles.error}>{errors.repeatPassword.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="birthDate" className={styles.label}>
            Birth Date
          </label>
          <input
            id="birthDate"
            type="date"
            className={styles.input}
            {...register("birthDate")}
          />
          {errors?.birthDate && (
            <p className={styles.error}>{errors.birthDate.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dni" className={styles.label}>
            DNI
          </label>
          <input
            id="dni"
            type="number"
            className={styles.input}
            {...register("dni")}
          />
          {errors?.dni && <p className={styles.error}>{errors.dni.message}</p>}
        </div>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
