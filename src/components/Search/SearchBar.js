import styles from "./SearchBar.module.css";
import { RxCross2 } from "react-icons/rx";

function SearchBar({
  formSubmitHandler,
  searchTerm,
  setSearchTerm,
  searchBy,
  setSearchBy,
  setError,
}) {
  return (
    <div className={styles.search}>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <input
          autoFocus
          autoComplete="off"
          type="search"
          name="book-search"
          id="book-search"
          value={searchTerm}
          placeholder={
            searchBy
              ? `Search by ${searchBy}...`
              : "Type the name of a book, author or subject..."
          }
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        {searchTerm && (
          <RxCross2
            className={styles["clear-icon"]}
            onClick={() => {
              setSearchTerm("");
              setError(null);
            }}
          />
        )}
      </form>
      {searchBy && (
        <button className={styles["btn-back"]} onClick={() => setSearchBy("")}>
          ← Back
        </button>
      )}
    </div>
  );
}

export default SearchBar;
