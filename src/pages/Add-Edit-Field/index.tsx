import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "../../store/store";
import { postField, patchField, getFields } from "../../slices/fields";
import { fieldSchema } from "./validations";
import { Field, FieldApi } from "../../types/fields";
import { getSeeds } from "../../slices/seeds";
import { getOwnerField } from "../../slices/field";

const Add_Edit_Fields = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: seeds } = useSelector((state) => state.reducer.seeds);
  const { user, loading: userLoading } = useSelector(
    (state) => state.reducer.users
  );

  const [formData, setFormData] = useState<Omit<Field, "_id">>({
    name: "",
    hectare: 0,
    location: "",
    latitude: 0,
    longitude: 0,
    isActive: false,
    ownerId: "",
    seedId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    dispatch(getSeeds());
  }, [dispatch]);

  useEffect(() => {
    if (!userLoading && user && id) {
      dispatch(getOwnerField(id))
        .unwrap()
        .then((response: FieldApi) => {
          const fieldToEdit = response;
          if (fieldToEdit) {
            const {
              name,
              hectare,
              location,
              latitude,
              longitude,
              isActive,
            } = fieldToEdit;
            setFormData({
              name,
              hectare,
              location,
              latitude,
              longitude,
              isActive,
              seedId: fieldToEdit.seedId._id ?? "",
              ownerId: fieldToEdit.ownerId._id || user?._id || "",
            });
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Access Denied",
            text: "You don't have permission to edit this field.",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/myFields");
          });
        });
    } else if (!userLoading && user && !id) {
      setFormData((prevData) => ({
        ...prevData,
        seedId: "",
        ownerId: user._id || "",
      }));
    }
  }, [id, user, userLoading, dispatch, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = fieldSchema.validate(formData, { abortEarly: false });

    if (validation.error) {
      const errorMessages: Record<string, string> = {};
      validation.error.details.forEach((err) => {
        errorMessages[err.path[0] as string] = err.message;
      });
      setErrors(errorMessages);
    } else {
      const result = await Swal.fire({
        title: id ? "Edit Field" : "Add Field",
        text: id
          ? "Are you sure you want to edit this field?"
          : "Are you sure you want to add this field?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        try {
          if (id) {
            await dispatch(patchField({ id, updates: formData }));
          } else {
            await dispatch(postField(formData));
          }
          dispatch(getFields());
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "The field has been saved successfully!",
          });
          navigate("/myFields");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while saving the field.",
          });
          console.error("Error saving the field:", error);
        }
      } else {
        Swal.fire({
          icon: "info",
          title: "Cancelled",
          text: "No changes were made.",
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <h1>Field</h1>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div className={styles.field}>
          <label>Hectare:</label>
          <input
            type="number"
            name="hectare"
            value={formData.hectare}
            onChange={handleChange}
          />
          {errors.hectare && <p className={styles.error}>{errors.hectare}</p>}
        </div>
        <div className={styles.field}>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <p className={styles.error}>{errors.location}</p>}
        </div>
        <div className={styles.field}>
          <label>Latitude:</label>
          <input
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
          {errors.latitude && (
            <p className={styles.error}>{errors.latitude}</p>
          )}
        </div>
        <div className={styles.field}>
          <label>Longitude:</label>
          <input
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
          {errors.longitude && (
            <p className={styles.error}>{errors.longitude}</p>
          )}
        </div>
        <div className={styles.field}>
          <label>Is Active:</label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label>Seed:</label>
          <select name="seedId" value={formData.seedId} onChange={handleChange}>
            <option value="">Select a Seed</option>
            {seeds.map((seed) => (
              <option key={seed._id} value={seed._id}>
                {seed.name}
              </option>
            ))}
          </select>
          {errors.seedId && <p className={styles.error}>{errors.seedId}</p>}
        </div>
        <div className={styles.buttons}>
          <button type="submit">Accept</button>
          <button type="button" onClick={() => navigate("/myFields")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add_Edit_Fields;
