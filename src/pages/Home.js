import { useState, useContext } from "react";

import styles from "./Home.module.css";
import logo from "../assets/logo_transparent.png";

import SearchMenu from "../components/Search/SearchMenu";
import Search from "../components/Search/Search";
import SearchItem from "../components/Search/SearchItem";
import Favorites from "../components/Favorites/Favorites";
import { Context as BooksContext } from "../context/books-context";

function Home() {
  const booksContext = useContext(BooksContext);
  const [startIndex, setStartIndex] = useState(0);
  const [searchBy, setSearchBy] = useState("");

  const startIndexHandler = () => {
    setStartIndex((prevIndex) => prevIndex + 10);
    const scrollTarget = document.getElementById("scroll-target");
    scrollTarget.scrollIntoView({ behavior: "smooth" });
  };

  const searchMenuHandler = (searchBy) => {
    setStartIndex(0);
    setSearchBy(searchBy);
  };

  return (
    <header className={styles["hero-header"]}>
      <Favorites />
      <img
        src={logo}
        alt="Book result"
        className={styles.logo}
        onClick={() => {
          booksContext.changeDisplayedBooks([]);
        }}
      />
      <h2 id="scroll-target">Search through millions of volumes</h2>
      {!searchBy && (
        <Search startIndex={startIndex} setStartIndex={setStartIndex} />
      )}

      {!searchBy && <h2>Looking for something a little more specific?</h2>}
      {searchBy ? (
        <Search
          searchMode={searchBy}
          setSearchMode={searchMenuHandler}
          startIndex={startIndex}
          setStartIndex={setStartIndex}
        />
      ) : (
        <SearchMenu onSearchBy={searchMenuHandler} />
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
  );
}

export default Home;
