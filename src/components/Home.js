import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import styles from "./Home.module.css";
import logo from "../assets/logo_transparent.png";
import SearchMenu from "./SearchMenu";
import Search from "./Search";
import BookInfo from "./BookInfo";

let isInitial = true;

function Home() {
  const [books, setBooks] = useState();
  const [searchMode, setSearchMode] = useState(undefined);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Checks if params exist/runs when changed
    if (isInitial) {
      isInitial = false;
      setSearchParams(""); // Removes searchParams on page reload
      return;
    }

    if ([...searchParams].length !== 0) {
      setSearchMode(searchParams.get("search"));
    } else {
      setSearchMode(undefined);
      setBooks(undefined); // Hides results on return to menu
    }
  }, [searchParams, setSearchMode]);

  const bookResultsHandler = useCallback((results) => {
    setBooks(results);
  }, []);

  return (
    <div className="App">
      <header className={styles["hero-header"]}>
        {/* <h1>BOOKBUDDY</h1> */}
        <img src={logo} className={styles.logo} />
        <h2>Search through millions of volumes with ease</h2>
        {!searchMode && <Search onSearch={bookResultsHandler} />}

        {!searchMode && <h2>Looking for something a little more specific?</h2>}
        {searchMode ? (
          <Search searchMode={searchMode} onSearch={bookResultsHandler} />
        ) : (
          <SearchMenu />
        )}

        {books && (
          <ul className={styles.results}>
            {books.map((book) => (
              <BookInfo key={book.id} book={book} />
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default Home;
