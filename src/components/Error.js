import { Link } from "react-router-dom";
import styles from "../pages/Home.module.css";

function Error() {
  return (
    <>
      <header className={styles["hero-header"]}>
        <h2 style={{ marginTop: "2rem", fontSize: "1.5rem" }}>
          Page not found!
        </h2>
        <Link to="/" relative="route">
          <button className={styles["btn-back"]}>← Go back</button>
        </Link>
      </header>
    </>
  );
}

export default Error;
