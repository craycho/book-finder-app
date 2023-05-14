import { useState } from "react";

import styles from "./SearchBar.module.css";
import { RxCross2 } from "react-icons/rx";

/* function useBooksContext() {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error("BooksContext must be used within a BooksContextProvider");
  }
  return context;
} */

function SearchBar({ formSubmitHandler, searchBy, setSearchBy, setError }) {
  const [currentInput, setCurrentInput] = useState("");
  return (
    <div className={styles.search}>
      <form className={styles.form} onSubmit={formSubmitHandler}>
        <input
          autoFocus
          autoComplete="off"
          type="search"
          name="book-search"
          id="book-search"
          value={currentInput}
          placeholder={
            searchBy
              ? `Search by ${searchBy}...`
              : "Type the name of a book, author or subject..."
          }
          onChange={(event) => setCurrentInput(event.target.value)}
        />
        {currentInput && (
          <RxCross2
            className={styles["clear-icon"]}
            onClick={() => {
              setCurrentInput("");
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
