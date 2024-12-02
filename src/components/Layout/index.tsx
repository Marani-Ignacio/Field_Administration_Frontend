import Footer from "../Footer";
import Header from "../Header";
import styles from "./styles.module.css";

const Layout = ({
  children,
}: {
  children:
    | string
    | number
    | React.ReactElement<
        unknown,
        string | React.JSXElementConstructor<unknown>
      >;
}) => {
  return (
    <div className={styles.navLayout}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
