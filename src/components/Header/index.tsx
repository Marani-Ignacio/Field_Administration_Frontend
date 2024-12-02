import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../store/store";
import { getUserByUid } from "../../slices/users";
import { getAuth } from "firebase/auth";
import { headerList, tokenList, adminList } from "./consts";
import styles from "./styles.module.css";
import SignOutButton from "../SignOutButton";

const Header = () => {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const dispatch = useDispatch();
  const { user, loading: userLoading } = useSelector(
    (state) => state.reducer.users
  );
  const [isAdmin, setIsAdmin] = useState(false);

  const handleClick = (link: string) => {
    navigate(link);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        dispatch(getUserByUid(currentUser.uid));
      }
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (user && !userLoading) {
      setIsAdmin(!!user.isAdmin); // Verificamos si el usuario es admin
    }
  }, [user, userLoading]);

  const menuList = token ? (isAdmin ? adminList : tokenList) : headerList;

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>CultivosNATR</h1>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {menuList.map((item, index) => (
            <li
              className={`${styles.navItem} ${
                path === item.link ? styles.active : ""
              }`}
              key={index}
              onClick={() => handleClick(item.link)}
            >
              {item.title}
            </li>
          ))}
          {token && (
            <li className={styles.navItem}>
              <SignOutButton />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
