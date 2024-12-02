import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../store/store";
import styles from "./styles.module.css";
import { getSeed } from "../../slices/seed";

const SeedCard = () => {
  const { id } = useParams<{ id: string }>();
  const { seed: seed } = useSelector((state) => state.reducer.seed);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    dispatch(getSeed(id));
  }, [dispatch, id]);

  const handleBack = () => {
    navigate("/adminSeeds");
  };

  if (!seed) {
    return <h1 className={styles.loading}>Loading...</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Seed Details</h1>
      </div>
      <div className={styles.seedCard}>
        <p>
          <strong>Name:</strong> {seed.name}
        </p>
        <p>
          <strong>Description:</strong> {seed.description}
        </p>
        <p>
          <strong>Fields:</strong> {seed.fields.length}
        </p>
        <button onClick={handleBack} className={styles.backButton}>
          Back to Seeds
        </button>
      </div>
    </div>
  );
};

export default SeedCard;
