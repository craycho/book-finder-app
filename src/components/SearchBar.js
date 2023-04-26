import { useEffect, useState } from "react";
import { useSearchParams, redirect } from "react-router-dom";

import styles from "./SearchBar.module.css";

const API_KEY = "AIzaSyB6EzRjXUNpB23ivuekvxOAyzpnBu0aaRk";
const searchTerm = "";

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInitial, setIsInitial] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      return;
    }

    const url = `https://www.googleapis.com/books/v1/volumes?&printType=books&q=${searchTerm}+${
      props.searchMode === "title"
        ? "intitle"
        : props.searchMode === "author"
        ? "inauthor"
        : "subject"
    }:${searchQuery}&key=${API_KEY}`;

    /**@todo Fuck around with startIndex=10 etc to implement pagination */

    const searchBooks = async function () {
      const response = await fetch(url);
      const resData = await response.json();
      // console.log(resData);

      // Displaying results
      const bookResults = resData.items.map((res) => {
        return {
          id: res.id,
          info: res.volumeInfo,
        };
      });
      props.onSearch([...bookResults]);
    };

    searchBooks();
  }, [searchQuery]);

  function submitHandler(event) {
    event.preventDefault();
    setSearchQuery(event.target["book-search"].value);
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <label htmlFor="book-search">Search by {props.searchMode}</label>
      <br />
      <input type="search" name="book-search" id="book-search" />
    </form>
  );
}

export default SearchBar;
