import { Link } from "react-router-dom";
import styles from "./SearchMenu.module.css";

function SearchMenu() {
  return (
    <ul className={styles["search-menu"]}>
      <Link to={`?search=title`}>
        <li>Search by title</li>
      </Link>
      <Link to={`?search=author`}>
        <li>Search by author</li>
      </Link>
      <Link to={`?search=subject`}>
        <li>Search by subject</li>
      </Link>
    </ul>
  );
}

export default SearchMenu;
