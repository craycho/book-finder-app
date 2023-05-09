import { Link } from "react-router-dom";
import styles from "./SearchMenu.module.css";

function SearchMenu() {
  return (
    <ul className={styles["search-menu"]}>
      <Link to={`?searchBy=title`}>
        <li>Search by title</li>
      </Link>
      <Link to={`?searchBy=author`}>
        <li>Search by author</li>
      </Link>
      <Link to={`?searchBy=subject`}>
        <li>Search by subject</li>
      </Link>
    </ul>
  );
}

export default SearchMenu;
