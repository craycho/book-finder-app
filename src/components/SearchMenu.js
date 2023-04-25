import { Link } from "react-router-dom";
import styles from "./SearchMenu.module.css";

function SearchMenu() {
  return (
    <ul className={styles["search-menu"]}>
      <li>
        <Link to={`?search=title`}>Search by title</Link>
      </li>
      <li>
        <Link to={`?search=author`}>Search by author</Link>
      </li>
      <li>
        <Link to={`?search=subject`}>Search by subject</Link>
      </li>
    </ul>
  );
}

export default SearchMenu;
