import { useContext, useEffect, useState } from "react";
import { Context as BooksContext } from "../../context/books-context";
import SearchItem from "./SearchItem";

import styles from "./SearchResults.module.css";

function SearchResults(props) {
  const { displayedBooks } = useContext(BooksContext);

  // Scrolls to top whenever results are rendered
  useEffect(() => {
    const scrollTarget = document.getElementById("scroll-target");
    scrollTarget.scrollIntoView({ behavior: "smooth" });
    props.setIsLoading(false);
  }, [displayedBooks[0].id]);
  /* Mali hack: Scrolla samo ako se promijeni ID property prve knjige, sto se desi samo 
  kada se searchaju nove knjige ili se loada novi page. Ne desava se ako se ijedna knjiga favoritea.*/

  return (
    <>
      <div className={styles.results}>
        {displayedBooks.map((book) => (
          <SearchItem key={book.id} book={book} />
        ))}
      </div>
    </>
  );
}

export default SearchResults;
