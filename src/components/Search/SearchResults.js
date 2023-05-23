import { useContext, useEffect } from "react";
import { Context as BooksContext } from "../../context/books-context";
import SearchItem from "./SearchItem";

import styles from "./SearchResults.module.css";

function SearchResults({ setIsLoading, onRecommend, setSearchBy }) {
  const { displayedBooks } = useContext(BooksContext);
  console.log(displayedBooks);
  const firstBookId = displayedBooks[0].id;

  // Scrolls to top whenever results are rendered
  useEffect(() => {
    const scrollTarget = document.getElementById("scroll-target");
    scrollTarget.scrollIntoView({ behavior: "smooth" });
    setIsLoading(false);
  }, [firstBookId, setIsLoading]);
  /* Mali hack: Scrolla samo ako se promijeni ID property prve knjige, sto se desi samo 
  kada se searchaju nove knjige ili se loada novi page. Ne desava se ako se ijedna knjiga favoritea.*/

  return (
    <>
      <div className={styles.results}>
        {displayedBooks.map((book) => (
          <SearchItem
            key={book.id}
            book={book}
            onRecommend={onRecommend}
            setSearchBy={setSearchBy}
          />
        ))}
      </div>
    </>
  );
}

export default SearchResults;
