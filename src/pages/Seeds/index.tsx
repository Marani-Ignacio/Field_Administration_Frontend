import { useEffect } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "../../store/store";
import { getSeeds } from "../../slices/seeds";
import SeedItem from "../../components/Seed";
import { Seed } from "../../types/seeds";

const Seeds = () => {
  const { list: seeds, loading: seedsLoading } = useSelector(
    (state) => state.reducer.seeds
  ) as { list: Seed[]; loading: boolean };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeeds());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {seedsLoading ? (
        <h1 className={styles.loading}>Loading...</h1>
      ) : (
        <div className={styles.list}>
          {seeds.map((seed) => (
            <SeedItem key={seed._id} seed={seed} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Seeds;
