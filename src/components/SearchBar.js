import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./SearchBar.module.css";

const API_KEY = "AIzaSyB6EzRjXUNpB23ivuekvxOAyzpnBu0aaRk";
const searchTerm = "";

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const isMounted = useRef(false);
  const { searchMode, onSearch } = props;

  useEffect(() => {
    console.log(isMounted);
    if (isMounted.current) {
      const url = `https://www.googleapis.com/books/v1/volumes?&printType=books&q=${searchTerm}${
        searchMode === "title"
          ? "+intitle"
          : searchMode === "author"
          ? "+inauthor"
          : "+subject"
      }:${searchQuery}&key=${API_KEY}`;

      /**@todo Fuck around with startIndex=10 etc to implement pagination */

      const searchBooks = async function () {
        const response = await fetch(url);
        const resData = await response.json();
        console.log(resData);

        // Displaying results
        const bookResults = resData.items.map((res) => {
          return {
            id: res.id,
            info: res.volumeInfo,
          };
        });
        onSearch([...bookResults]);
      };

      searchBooks();
    } else {
      isMounted.current = true;
    }
  }, [searchQuery, searchMode, onSearch, isMounted]); // Daje warning jer nema isInitial

  function submitHandler(event) {
    event.preventDefault();
    setSearchQuery(event.target["book-search"].value);
  }

  return (
    <>
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
        {searchMode && (
          <Link to="/" relative="route">
            <button className={styles["btn-back"]}>← Back</button>
          </Link>
        )}
      </form>
    </>
  );
}

export default SearchBar;

/** @todo BONUS FEATURE: */
/*
  fetchanje pojedinacnog volumea (https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey) koji
  izmedju ostalog ima i mainCategory i categories properties, koji se mogu koristiti za pretragu pomocu subject query stringa.
  */
