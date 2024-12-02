import { useEffect } from "react";
import Swal from "sweetalert2";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "../../store/store";
import { deleteField, getMyFields } from "../../slices/fields";
import { useNavigate } from "react-router-dom";

const MyFields = () => {
  const { list: fields } = useSelector(
    (state) => state.reducer.fields.myFields
  );
  const { user, loading: userLoading } = useSelector(
    (state) => state.reducer.users
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return;
    dispatch(getMyFields(user._id));
  }, [dispatch, user?._id]);

  const isLoading = userLoading;
  const hasFields = fields.length > 0;

  const handleEdit = (id: string) => {
    navigate(`/editField/${id}`);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Field",
      text: "Are you sure you want to delete this field?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteField(id));
        Swal.fire("Deleted!", "The field has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error",
          "An error occurred while deleting the field.",
          "error"
        );
        console.error("Error deleting the field:", error);
      }
    }
  };

  const handleSee = (id: string) => {
    navigate(`/Field/${id}`);
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => navigate("/addField")}
        className={styles.addButton}
      >
        Add Field
      </button>
      {isLoading ? (
        <h1 className={styles.loading}>Loading...</h1>
      ) : hasFields ? (
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
                <th>Seed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr key={field._id}>
                  <td>{field.name}</td>
                  <td>{field.hectare}</td>
                  <td>{field.location}</td>
                  <td>{field.latitude}</td>
                  <td>{field.longitude}</td>
                  <td>{field.isActive ? "True" : "False"}</td>
                  <td>{field.seedId?.name ?? "Unknown"}</td>
                  <td>
                    <button
                      onClick={() => field._id && handleSee(field._id)}
                      className={styles.seeButton}
                    >
                      <img
                        src="public/images/ver.png"
                        alt="See More"
                        className={styles.icon}
                      />
                    </button>
                    <button
                      onClick={() => field._id && handleEdit(field._id)}
                      className={styles.editButton}
                    >
                      <img
                        src="public/images/editar.png"
                        alt="Modify"
                        className={styles.icon}
                      />
                    </button>
                    <button
                      onClick={() => field._id && handleDelete(field._id)}
                      className={styles.deleteButton}
                    >
                      <img
                        src="public/images/eliminar.png"
                        alt="Delete"
                        className={styles.icon}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className={styles.noFields}>No fields available</h1>
      )}
    </div>
  );
};

export default MyFields;

