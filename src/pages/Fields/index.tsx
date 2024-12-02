import { useEffect } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "../../store/store";
import { getFields } from "../../slices/fields";
import { RootState } from "../../store/store";

const Fields = () => {
  const { list: fields, loading: fieldsLoading } = useSelector(
    (state: RootState) => state.reducer.fields.allFields
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFields());
  }, [dispatch]);

  const isDataReady = !fieldsLoading;

  return (
    <div className={styles.container}>
      {!isDataReady ? (
        <h1 className={styles.loading}>Loading...</h1>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Hectare</th>
                <th>Location</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>IsActive</th>
                <th>Owner</th>
                <th>Seed</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => {
                const ownerData = `${field.ownerId.dni} - ${field.ownerId.name} ${field.ownerId.lastName}`;
                const seedData = field.seedId?.name ?? "None";

                return (
                  <tr key={field._id}>
                    <td>{field.name}</td>
                    <td>{field.hectare}</td>
                    <td>{field.location}</td>
                    <td>{field.latitude}</td>
                    <td>{field.longitude}</td>
                    <td>{field.isActive ? "True" : "False"}</td>
                    <td>{ownerData}</td>
                    <td>{seedData}</td>
                    </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Fields;
