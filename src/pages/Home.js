import { useState, useContext } from "react";

import styles from "./Home.module.css";
import logo from "../assets/logo_transparent.png";

import { Context as BooksContext } from "../context/books-context";
import Favorites from "../components/Favorites/Favorites";
import SearchMenu from "../components/Search/SearchMenu";
import SearchBar from "../components/Search/SearchBar";
import SearchResults from "../components/Search/SearchResults";

const API_KEY = "AIzaSyB6EzRjXUNpB23ivuekvxOAyzpnBu0aaRk";
const URL = `https://www.googleapis.com/books/v1/volumes?&printType=books&key=${API_KEY}&q=`;

function getSearchBy(searchBy) {
  if (searchBy === "title") return "+intitle";
  if (searchBy === "author") return "+inauthor";
  if (searchBy === "subject") return "+subject";
  return "";
}

function setFavorites(resItems, favorites) {
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

// Possible with useState but unnecessary, not used outside of component
let searchTerm = "";
let startIndex = 0;

function Home() {
  const booksContext = useContext(BooksContext);
  const [searchBy, setSearchBy] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async function (
    searchTerm,
    startIndex = 0,
    moreSearchBy = undefined
  ) {
    const searchMode = getSearchBy(moreSearchBy ?? searchBy);
    const url = searchMode
      ? `${URL}${searchMode}:${searchTerm}&startIndex=${startIndex}`
      : `${URL}${searchTerm}&startIndex=${startIndex}`;

    console.log(url);

    try {
      setIsLoading(true);
      const response = await fetch(url);
      const resData = await response.json();
      console.log(resData);

      // Checks if any of the results are in the favorites array and updates them accordingly
      if (resData.items !== undefined) {
        const bookResults = setFavorites(resData.items, booksContext.favorites);

        setError(null);
        booksContext.changeDisplayedBooks([...bookResults]);
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
    const newSearchTerm = event.target["book-search"].value;

    if (newSearchTerm === "") {
      setError("Search field can't be empty...");
      return;
    }

    fetchBooks(newSearchTerm);
    searchTerm = newSearchTerm;
    startIndex = 0;
  };

  const recommendHandler = (recommendSearchTerm, searchBy) => {
    setSearchBy(searchBy);
    fetchBooks(recommendSearchTerm, 0, searchBy);

    searchTerm = recommendSearchTerm;
    startIndex = 0;
  };

  const loadMoreHandler = () => {
    fetchBooks(searchTerm, startIndex + 10);
    startIndex += 10;
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

      {!searchBy ? (
        <>
          <SearchBar
            formSubmitHandler={formSubmitHandler}
            setError={setError}
          />
          <h2>Looking for something a little more specific?</h2>
          <SearchMenu onSearchBy={setSearchBy} />
        </>
      ) : (
        <SearchBar
          formSubmitHandler={formSubmitHandler}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          setError={setError}
        />
      )}

      {isLoading && <span className={styles["spinner-results"]}></span>}
      {error && <p className={styles.error}>{error}</p>}

      {booksContext.displayedBooks.length > 0 && (
        <>
          <SearchResults
            onRecommend={recommendHandler}
            setIsLoading={setIsLoading}
          />
          <button
            className={styles["btn-loadMore"]}
            onClick={() => {
              setIsLoading(true);
              loadMoreHandler();
            }}
          >
            {isLoading ? (
              <span className={styles["spinner-loadMore"]}></span>
            ) : (
              <p>Load more results...</p>
            )}
          </button>
        </>
      )}
    </header>
  );
}

export default Home;

/**@todo Fix key bug when searching with more in genre */
