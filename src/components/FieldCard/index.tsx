import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../store/store";
import { getField } from "../../slices/field";
import styles from "./styles.module.css";

const FieldCard = () => {
  const { id } = useParams<{ id: string }>();
  const { field: field } = useSelector((state) => state.reducer.field);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    dispatch(getField(id));
  }, [dispatch, id]);

  const handleBack = () => {
    navigate("/myFields");
  };

  if (!field) {
    return <h1 className={styles.loading}>Loading...</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Field details</h1>
      </div>
      <div className={styles.fieldCard}>
        <p>
          <strong>Name:</strong> {field.name}
        </p>
        <p>
          <strong>Hectare:</strong> {field.hectare}
        </p>
        <p>
          <strong>Location:</strong> {field.location}
        </p>
        <p>
          <strong>Latitude:</strong> {field.latitude}
        </p>
        <p>
          <strong>Longitude:</strong> {field.longitude}
        </p>
        <p>
          <strong>Is Active:</strong> {field.isActive ? "True" : "False"}
        </p>
        <p>
          <strong>Seed:</strong> {field.seedId?.name}
        </p>
        <button onClick={handleBack} className={styles.backButton}>
          Back
        </button>
      </div>
    </div>
  );
};

export default FieldCard;
