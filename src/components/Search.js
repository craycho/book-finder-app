import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Search.module.css";

const API_KEY = "AIzaSyB6EzRjXUNpB23ivuekvxOAyzpnBu0aaRk";
const URL = `https://www.googleapis.com/books/v1/volumes?&printType=books&key=${API_KEY}&q=`;

function Search(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const { searchMode, onSearch, startIndex, setStartIndex } = props;
  console.log(startIndex);

  useEffect(() => {
    if (isMounted.current) {
      const searchBy =
        searchMode === "title"
          ? "+intitle"
          : searchMode === "author"
          ? "+inauthor"
          : "+subject";

      const url = searchMode
        ? `${URL}${searchBy}:${searchQuery}`
        : URL + searchQuery;
      console.log(url);

      /**@todo Fuck around with startIndex=10 etc to implement pagination */

      const searchBooks = async function () {
        try {
          setIsLoading(true);
          const response = await fetch(url + `&startIndex=${startIndex}`);
          const resData = await response.json();
          console.log(resData);

          // Displaying results
          const bookResults = resData.items.map((res) => {
            return {
              id: res.id,
              info: res.volumeInfo,
            };
          });

          setError(null);
          onSearch([...bookResults]);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setError(`No results found for ${searchQuery}...`);
          throw new Error(`No results found for ${searchQuery}...`);
        }
      };

      searchBooks();
    } else {
      isMounted.current = true;
    }
  }, [searchQuery, searchMode, onSearch, isMounted, startIndex]);

  function submitHandler(event) {
    event.preventDefault();
    if (event.target["book-search"].value === "") {
      setError("Search field can't be empty...");
      return;
    }

    const scrollTarget = document.getElementById("scroll-target");
    setTimeout(() => {
      scrollTarget.scrollIntoView({ behavior: "smooth" });
    }, 500);

    setStartIndex(0);
    setSearchQuery(event.target["book-search"].value);
  }

  return (
    <div className={styles.search}>
      <form className={styles.form} onSubmit={submitHandler}>
        <br />
        <input
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
  );
}

export default Search;

/** @todo BONUS FEATURE: */
/*
  fetchanje pojedinacnog volumea (https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey) koji
  izmedju ostalog ima i mainCategory i categories properties, koji se mogu koristiti za pretragu pomocu subject query stringa.
  */
