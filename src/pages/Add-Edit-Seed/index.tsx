import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "../../store/store";
import { postSeed, patchSeed, getSeeds } from "../../slices/seeds";
import { seedSchema } from "./validations";
import { Seed } from "../../types/seeds";

const Add_Edit_Seeds = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list } = useSelector((state) => state.reducer.seeds);

  const [formData, setFormData] = useState<Omit<Seed, "_id">>({
    name: "",
    description: "",
    fields: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    dispatch(getSeeds());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      const seedToEdit = list.find((seed) => seed._id === id);
      if (seedToEdit) {
        const { name, description, fields } = seedToEdit;
        setFormData({ name, description, fields });
      }
    }
  }, [id, list]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = seedSchema.validate(formData, { abortEarly: false });

    if (validation.error) {
      const errorMessages: Record<string, string> = {};
      validation.error.details.forEach((err) => {
        errorMessages[err.path[0] as string] = err.message;
      });
      setErrors(errorMessages);
    } else {
      const result = await Swal.fire({
        title: id ? "Edit Seed" : "Add Seed",
        text: id ? "Are you sure you want to edit this seed?" : "Are you sure you want to add this seed?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        try {
          if (id) {
            await dispatch(patchSeed({ id, updates: formData }));
          } else {
            await dispatch(postSeed(formData));
          }
          dispatch(getSeeds());
          Swal.fire("Success", "The seed has been saved successfully!", "success");
          navigate("/adminSeeds");
        } catch (error) {
          Swal.fire("Error", "An error occurred while saving the seed.", "error");
          console.error("Error al guardar la semilla:", error);
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
        <h1>Seed</h1>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.field}>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className={styles.error}>{errors.description}</p>
          )}
        </div>

        <div className={styles.buttons}>
          <button type="submit">Accept</button>
          <button type="button" onClick={() => navigate("/adminSeeds")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add_Edit_Seeds;
