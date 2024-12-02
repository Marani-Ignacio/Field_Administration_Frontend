import styles from "./styles.module.css";
import { SeedApi } from "../../types/seeds";

interface SeedItemProps {
  seed: SeedApi;
  onSee?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const SeedItem = ({ seed, onSee, onEdit, onDelete }: SeedItemProps) => {

  return (
    <div className={styles.seed}>
      <p>{seed.name}</p>
      <p>{seed.description}</p>
      <ul className={styles.fieldsList}>
        {seed.fields.map((field) => (
          <li key={field._id} className={styles.fieldItem}>
            <p>{field.name}</p>
            <p>{field.hectare} hectares</p>
            <p>{field.location}</p>
            <p>
              Lat: {field.latitude}, Long: {field.longitude}
            </p>
          </li>
        ))}
      </ul>
      <div className={styles.ButtonList}>
      {onSee && (
        <button
          onClick={() => seed._id && onSee(seed._id)}
          className={styles.seeButton}
        >
          See More
        </button>
      )}
      {onEdit && (
        <button
          onClick={() => seed._id && onEdit(seed._id)}
          className={styles.editButton}
        >
          Modify
        </button>
      )}
      {onDelete && (
        <button
          onClick={() => seed._id && onDelete(seed._id)}
          className={styles.deleteButton}
        >
          Delete
        </button>
      )}
      </div>
    </div>
  );
};

export default SeedItem;
