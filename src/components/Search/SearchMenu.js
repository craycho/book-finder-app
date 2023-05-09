import styles from "./SearchMenu.module.css";

function SearchMenu({ onSearchBy }) {
  return (
    <ul className={styles["search-menu"]}>
      <li onClick={() => onSearchBy("title")}>Search by title</li>
      <li onClick={() => onSearchBy("author")}>Search by author</li>
      <li onClick={() => onSearchBy("subject")}>Search by subject</li>
    </ul>
  );
}

export default SearchMenu;
