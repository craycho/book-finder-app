import { useState, useContext } from "react";

import { Context as BooksContext } from "./context/books-context";
import Favorites from "./components/Favorites/Favorites";
import SearchMenu from "./components/Search/SearchMenu";
import SearchBar from "./components/Search/SearchBar";
import SearchResults from "./components/Search/SearchResults";

import styles from "./Main.module.css";
import logo from "./assets/logo_transparent_cropped.png";

const API_KEY = "AIzaSyB6EzRjXUNpB23ivuekvxOAyzpnBu0aaRk";
const URL = `https://www.googleapis.com/books/v1/volumes?&printType=books&maxResults=20&key=${API_KEY}&q=`;

function useBooksContext() {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error("Problem fetching BooksContext.");
  }
  return context;
}

function getSearchBy(searchBy) {
  if (searchBy === "title") return "+intitle";
  if (searchBy === "author") return "+inauthor";
  if (searchBy === "subject") return "+subject";
  return "";
}

function setFavoriteResults(resItems, favorites) {
  const bookResults = resItems.map((res) => {
    for (const fav of favorites) {
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

  return bookResults;
}

function removeDuplicateResults(bookResults) {
  const uniqueResults = bookResults.reduce((accumulator, currentBook) => {
    if (!accumulator.find((accBook) => accBook.id === currentBook.id)) {
      accumulator.push(currentBook);
    }
    return accumulator;
  }, []);

  return uniqueResults;
}

// Possible with useState but unnecessary, not used outside of component
let startIndex = 0;
let resultsFor = "";

function Main() {
  const booksContext = useBooksContext(BooksContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async function (
    searchTerm,
    startIndex = 0,
    recommendBy = undefined
  ) {
    const searchMode = getSearchBy(recommendBy ?? searchBy);
    const url = searchMode
      ? `${URL}${searchMode}:${searchTerm}&startIndex=${startIndex}`
      : `${URL}${searchTerm}&startIndex=${startIndex}`;

    console.log(url);

    try {
      setIsLoading(true);
      const response = await fetch(url);
      const resData = await response.json();

      // Checks if any of the results are in the favorites array and updates them accordingly
      if (resData.items !== undefined) {
        const bookResults = setFavoriteResults(
          resData.items,
          booksContext.favorites
        );

        const uniqueResults = removeDuplicateResults(bookResults);
        booksContext.changeDisplayedBooks([...uniqueResults]);
        setError(null);
        setIsLoading(false);
        return bookResults;
      } else {
        setIsLoading(false);
        setError(
          `No results found for ${searchTerm}${
            searchBy && " in " + searchBy + "s"
          }...`
        );
      }
    } catch (error) {
      console.log(`Something went wrong! ${error.name}: ${error.message}`);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const newSearchTerm = event.target["book-search"].value.trim();

    if (newSearchTerm === "") {
      setError("Search field can't be empty...");
      return;
    }

    fetchBooks(newSearchTerm);
    setSearchTerm(newSearchTerm);
    startIndex = 0;
    resultsFor = newSearchTerm;
  };

  const recommendBooksHandler = (recommendSearchTerm, searchBy) => {
    if (recommendSearchTerm === searchTerm) {
      const scrollTarget = document.getElementById("scroll-target");
      scrollTarget.scrollIntoView({ behavior: "smooth" });
      setError(`Already showing results for ${searchTerm}...`);
      return;
    }
    setSearchBy(searchBy);
    fetchBooks(recommendSearchTerm, 0, searchBy);
    setSearchTerm(recommendSearchTerm);

    startIndex = 0;
    resultsFor = recommendSearchTerm;
  };

  const loadMoreHandler = () => {
    fetchBooks(searchTerm, startIndex + 20);
    startIndex += 20;
  };

  const clearAll = () => {
    booksContext.changeDisplayedBooks([]);
    setSearchTerm("");
    setSearchBy("");
    setError(null);
    resultsFor = "";
  };

  return (
    <section className={styles["hero-section"]}>
      <Favorites onRecommend={recommendBooksHandler} />
      <img
        src={logo}
        alt="Book result"
        className={styles.logo}
        onClick={clearAll}
      />
      <h2 id="scroll-target" className={styles["search-introduction"]}>
        Search through millions of volumes
      </h2>

      {!searchBy ? (
        <>
          <SearchBar
            formSubmitHandler={formSubmitHandler}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setError={setError}
          />
          <h2 className={styles["looking-for-instruction"]}>
            Looking for something a little more specific?
          </h2>
          <SearchMenu onSearchBy={setSearchBy} />
        </>
      ) : (
        <SearchBar
          formSubmitHandler={formSubmitHandler}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          setError={setError}
        />
      )}

      {isLoading && <span className={styles["spinner-results"]}></span>}
      {error && (
        <p className={styles.error} style={{ marginTop: searchBy && "4.5rem" }}>
          {error}
        </p>
      )}

      {booksContext.displayedBooks.length > 0 && (
        <>
          {!error && (
            <h2
              className={styles["showing-results"]}
              style={{ marginTop: searchBy && "6rem" }}
            >
              Showing results for "{resultsFor}"
            </h2>
          )}
          <SearchResults
            onRecommend={recommendBooksHandler}
            setIsLoading={setIsLoading}
          />
          <h2 style={{ paddingTop: "1rem" }}>
            Didn't find what you were looking for?
          </h2>
          <button
            className={styles["btn-load"]}
            onClick={() => {
              setIsLoading(true);
              loadMoreHandler();
            }}
          >
            {isLoading ? (
              <span className={styles["spinner-load"]}></span>
            ) : (
              "Load more results..."
            )}
          </button>
        </>
      )}
    </section>
  );
}

export default Main;
