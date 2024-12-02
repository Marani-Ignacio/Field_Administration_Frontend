import { useEffect } from "react";
import Swal from "sweetalert2";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "../../store/store";
import { getSeeds, deleteSeed } from "../../slices/seeds";
import { useNavigate } from "react-router-dom";
import SeedItem from "../../components/Seed";
import { RootState } from "../../store/store";

const AdminSeeds = () => {
  const { list: seeds, loading: seedsLoading } = useSelector(
    (state: RootState) => state.reducer.seeds
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSeeds());
  }, [dispatch]);

  const handleEdit = (id: string) => {
    navigate(`/editSeed/${id}`);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Seed",
      text: "Are you sure you want to delete this seed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(deleteSeed(id));
        Swal.fire("Deleted!", "The seed has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error",
          "An error occurred while deleting the seed.",
          "error"
        );
        console.error("Error al eliminar la semilla:", error);
      }
    }
  };

  const handleSee = (id: string) => {
    navigate(`/Seed/${id}`);
  };

  return (
    <div className={styles.container}>
      <button onClick={() => navigate("/addSeed")} className={styles.addButton}>
        Add Seed
      </button>
      {seedsLoading ? (
        <h1 className={styles.loading}>Loading...</h1>
      ) : (
        <div className={styles.list}>
          {seeds.map((seed) => (
            <SeedItem
              key={seed._id}
              seed={seed}
              onSee={handleSee}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSeeds;
