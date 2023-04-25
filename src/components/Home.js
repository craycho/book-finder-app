import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Home.module.css";
import SearchMenu from "./SearchMenu";
import SearchBar from "./SearchBar";

const API_KEY = "AIzaSyB6EzRjXUNpB23ivuekvxOAyzpnBu0aaRk";
const searchTerm = "dragon";
let isInitial = true;

function Home() {
  const [books, setBooks] = useState([]);

  const [searchParams] = useSearchParams();
  const [searchMode, setSearchMode] = useState("");

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    setSearchMode(searchParams.get("search"));
  }, [searchParams]);

  function bookResultsHandler(results) {
    setBooks(results);
  }

  return (
    <div className="App">
      <header className={styles["hero-header"]}>
        <h1>Book Buddy</h1>
        {searchMode === "" ? (
          <SearchMenu />
        ) : (
          <SearchBar searchMode={searchMode} onSearch={bookResultsHandler} />
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
