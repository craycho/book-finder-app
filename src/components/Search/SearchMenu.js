import styles from "./SearchMenu.module.css";

function SearchMenu({ onSearchBy }) {
  return (
    <div className={styles["search-menu"]}>
      <button
        onClick={() => onSearchBy("title")}
        className={styles["search-menu-btn"]}
      >
        Search by title
      </button>
      <button
        onClick={() => onSearchBy("author")}
        className={styles["search-menu-btn"]}
      >
        Search by author
      </button>
      <button
        onClick={() => onSearchBy("subject")}
        className={styles["search-menu-btn"]}
      >
        Search by subject
      </button>
    </div>
  );
}

export default SearchMenu;
