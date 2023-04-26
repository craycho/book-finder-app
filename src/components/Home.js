import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Home.module.css";
import SearchMenu from "./SearchMenu";
import SearchBar from "./SearchBar";

const API_KEY = "AIzaSyB6EzRjXUNpB23ivuekvxOAyzpnBu0aaRk";
const searchTerm = "";

let isInitial = true;

function Home() {
  const [books, setBooks] = useState([]);
  const [searchMode, setSearchMode] = useState(undefined);
  const [searchParams] = useSearchParams();

  // Checks if params exist/runs when changed
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if ([...searchParams].length !== 0) {
      setSearchMode(searchParams.get("search"));
    } else {
      setSearchMode(undefined);
      setBooks([]); // Hides results on return to menu
    }
  }, [searchParams, setSearchMode]);

  function bookResultsHandler(results) {
    setBooks(results);
  }

  function showSearchMenu() {
    setSearchMode(undefined);
  }

  return (
    <div className="App">
      <header className={styles["hero-header"]}>
        <h1>Book Buddy</h1>
        {searchMode ? (
          <SearchBar
            searchMode={searchMode}
            onSearch={bookResultsHandler}
            onNavigate={showSearchMenu}
          />
        ) : (
          <SearchMenu />
        )}

        {books.length > 0 && (
          <ul className={styles.ul}>
            {books &&
              books.map((book) => (
                <li key={book.id} className={styles.li}>
                  {book.info.title ?? "Untitled"}
                </li>
              ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default Home;
