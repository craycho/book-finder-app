import { useContext, useEffect, useState } from "react";
import { Context as BooksContext } from "../../context/books-context";
import SearchItem from "./SearchItem";

import styles from "./SearchResults.module.css";

function SearchResults(props) {
  const { displayedBooks } = useContext(BooksContext);
  const [isLoading, setIsLoading] = useState(false);

  // Scrolls to top whenever results change
  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      const scrollTarget = document.getElementById("scroll-target");
      scrollTarget.scrollIntoView({ behavior: "smooth" });
      setIsLoading(false);
    }, 200);
  }, [displayedBooks]);

  return (
    <>
      <div className={styles.results}>
        {displayedBooks.map((book) => (
          <SearchItem key={book.id} book={book} />
        ))}
      </div>
      <button
        className={styles["btn-load"]}
        onClick={() => {
          setIsLoading(true);
          props.changeStartIndex();
        }}
      >
        {isLoading ? (
          <span className={styles.loader}></span>
        ) : (
          <p>Load more results...</p>
        )}
      </button>
    </>
  );
}

export default SearchResults;
