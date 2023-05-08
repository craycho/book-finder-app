import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context as BooksContext } from "../../context/books-context";

import styles from "./Search.module.css";
import SearchItem from "./SearchItem";

const API_KEY = "AIzaSyB6EzRjXUNpB23ivuekvxOAyzpnBu0aaRk";
const URL = `https://www.googleapis.com/books/v1/volumes?&printType=books&key=${API_KEY}&q=`;

function getSearchBy(searchMode) {
  if (searchMode === "title") return "+intitle";
  if (searchMode === "author") return "+inauthor";
  return "+subject";
}

function useBooks() {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
}

/* function OtherSearch(props) {
  const { searchMode, startIndex, setStartIndex } = props;
  const isMounted = useRef(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const booksContext = useBooks();

  const searchBooks = async function (url) {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const resData = await response.json();

      // Displaying results
      setTimeout(() => {
        const scrollTarget = document.getElementById("scroll-target");
        scrollTarget.scrollIntoView({ behavior: "smooth" });
      }, 100);

      // Checks if any of the results are in the favorites array
      if (resData.items !== undefined) {
        setError(null);
        setIsLoading(false);
        return resData.items;
      } else {
        setIsLoading(false);
        setError(`No results found for ${searchQuery}...`);
        return [];
      }
    } catch (error) {
      throw new Error(`Something went wrong! ${error.name}: ${error.message}`);
    }
  };

  useEffect(() => {
    const displayResults = async function () {
      if (isMounted.current) {
        const searchBy = getSearchBy(searchMode);
        const url = searchMode
          ? `${URL}${searchBy}:${searchQuery}&startIndex=${startIndex}`
          : `${URL}${searchQuery}&startIndex=${startIndex}`;

        const resData = await searchBooks(url);
        console.log(resData);

        const bookResults = resData.map((res) => {
          for (const fav of booksContext.favorites) {
            if (fav.id === res.id) {
              return {
                id: res.id,
                info: res.volumeInfo,
                favorite: true,
              };
            }
          }
          // Else
          return {
            id: res.id,
            info: res.volumeInfo,
            favorite: false,
          };
        });
        console.log(bookResults);
        setDisplayedBooks([...bookResults]);
      } else {
        isMounted.current = true;
      }
    };
    displayResults();
  }, [searchQuery, searchMode, isMounted, startIndex]);

  function submitHandler(event) {
    event.preventDefault();
    if (event.target["book-search"].value === "") {
      setError("Search field can't be empty...");
      return;
    }

    setStartIndex(0); // Every search is automatically set to the first page
    setSearchQuery(event.target["book-search"].value);
  }

  return (
    <>
      <div className={styles.search}>
        <form className={styles.form} onSubmit={submitHandler}>
          <br />
          <input
            autoFocus
            autoComplete="off"
            type="search"
            name="book-search"
            id="book-search"
            placeholder={
              searchMode
                ? `Search by ${searchMode}...`
                : "Type the name of a book, author or subject..."
            }
          />
        </form>
        {searchMode && (
          <Link to="/" relative="route">
            <button className={styles["btn-back"]}>← Back</button>
          </Link>
        )}
        {isLoading && <span className={styles.loader}></span>}
        {error && <p className={styles.error}>{error}</p>}
      </div>

      {displayedBooks.length > 0 &&
        displayedBooks.map((res) => <SearchItem key={res.id} book={res} />)}
    </>
  );
}

export default OtherSearch; */

/** @todo BONUS FEATURE: */
/*
  fetchanje pojedinacnog volumea (https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey) koji
  izmedju ostalog ima i mainCategory i categories properties, koji se mogu koristiti za pretragu pomocu subject query stringa.
  */
