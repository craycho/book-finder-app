import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import styles from "./Home.module.css";
import logo from "../assets/logo_transparent.png";

import SearchMenu from "../components/Search/SearchMenu";
import Search from "../components/Search/Search";
import SearchItem from "../components/Search/SearchItem";
import Favorites from "../components/Favorites/Favorites";
import { Context as BooksContext } from "../context/books-context";

let isInitial = true;

function Home() {
  const booksContext = useContext(BooksContext);
  const [searchMode, setSearchMode] = useState(undefined);
  const [startIndex, setStartIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Checks if search params exist/runs when they're changed
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      setSearchParams(""); // Removes searchParams on page reload
      setStartIndex(0);
      return;
    }

    if ([...searchParams].length !== 0) {
      setSearchMode(searchParams.get("searchBy"));
      setStartIndex(0);
    } else {
      setSearchMode(undefined);
      // setBooks(undefined); // Hides results on return to menu
      setStartIndex(0);
    }
  }, [searchParams, setSearchMode, setSearchParams]);

  const startIndexHandler = () => {
    setStartIndex((prevIndex) => prevIndex + 10);
    const scrollTarget = document.getElementById("scroll-target");
    scrollTarget.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <header className={styles["hero-header"]}>
        <Favorites />
        <img
          src={logo}
          alt="Book result"
          className={styles.logo}
          onClick={() => {
            booksContext.changeDisplayedBooks([]);
            navigate("/");
          }}
        />
        <h2 id="scroll-target">Search through millions of volumes</h2>
        {!searchMode && (
          <Search startIndex={startIndex} setStartIndex={setStartIndex} />
        )}

        {!searchMode && <h2>Looking for something a little more specific?</h2>}
        {searchMode ? (
          <Search
            searchMode={searchMode}
            startIndex={startIndex}
            setStartIndex={setStartIndex}
          />
        ) : (
          <SearchMenu />
        )}

        {booksContext.displayedBooks.length > 0 && (
          <>
            <div className={styles.results}>
              {booksContext.displayedBooks.map((book) => (
                <SearchItem key={book.id} book={book} />
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
