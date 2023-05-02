import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import styles from "./Home.module.css";
import logo from "../assets/logo_transparent.png";
import SearchMenu from "../components/SearchMenu";
import Search from "../components/Search";
import BookInfo from "../components/BookInfo";

let isInitial = true;

function Home() {
  const [books, setBooks] = useState(null);
  const [searchMode, setSearchMode] = useState(undefined);
  const [startIndex, setStartIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Checks if params exist/runs when changed
    if (isInitial) {
      isInitial = false;
      setSearchParams(""); // Removes searchParams on page reload
      setStartIndex(0);
      return;
    }

    if ([...searchParams].length !== 0) {
      setSearchMode(searchParams.get("search"));
      setStartIndex(0);
    } else {
      setSearchMode(undefined);
      setBooks(undefined); // Hides results on return to menu
      setStartIndex(0);
    }
  }, [searchParams, setSearchMode, setSearchParams]);

  const bookResultsHandler = useCallback((results) => {
    setBooks(results);
  }, []);

  const startIndexHandler = () => {
    setStartIndex((prevIndex) => prevIndex + 10);
    const scrollTarget = document.getElementById("scroll-target");
    scrollTarget.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <header className={styles["hero-header"]}>
        <img src={logo} alt="Book result" className={styles.logo} />
        <h2 id="scroll-target">Search through millions of volumes</h2>
        {!searchMode && (
          <Search
            onSearch={bookResultsHandler}
            startIndex={startIndex}
            setStartIndex={setStartIndex}
          />
        )}

        {!searchMode && <h2>Looking for something a little more specific?</h2>}
        {searchMode ? (
          <Search
            searchMode={searchMode}
            onSearch={bookResultsHandler}
            startIndex={startIndex}
            setStartIndex={setStartIndex}
          />
        ) : (
          <SearchMenu />
        )}

        {books && (
          <>
            <div className={styles.results}>
              {books.map((book) => (
                <BookInfo key={book.id} book={book} />
              ))}
            </div>
            <button className={styles["btn-load"]} onClick={startIndexHandler}>
              Load more results...
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default Home;
