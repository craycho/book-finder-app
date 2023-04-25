import { useEffect, useState } from "react";

import styles from "./SearchBar.module.css";

const API_KEY = "AIzaSyB6EzRjXUNpB23ivuekvxOAyzpnBu0aaRk";
const searchTerm = "dragon";

let isInitial = true;

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState("");

  /**@todo Ne radi kada se pritisne back, rezultati se svakako displayayu. */
  /*  useEffect(() => {
    if (props.searchMode === "title") {
      setUrl(
        `https://www.googleapis.com/books/v1/volumes?&printType=books&q=${searchTerm}+intitle:${searchQuery}&key=${API_KEY}`
      );
    } else if (props.searchMode === "author") {
      setUrl(
        `https://www.googleapis.com/books/v1/volumes?&printType=books&q=${searchTerm}+inauthor:${searchQuery}&key=${API_KEY}`
      );
    } else if (props.searchMode === "subject") {
      setUrl(
        `https://www.googleapis.com/books/v1/volumes?&printType=books&q=${searchTerm}+subject:${searchQuery}&key=${API_KEY}`
      );
    } else return;
  }, [searchQuery]); */

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    const url = `https://www.googleapis.com/books/v1/volumes?&printType=books&q=${searchTerm}+${
      props.searchMode === "title"
        ? "intitle"
        : props.searchMode === "author"
        ? "inauthor"
        : "subject"
    }:${searchQuery}&key=${API_KEY}`;

    const searchBooks = async function () {
      const response = await fetch(url);
      const resData = await response.json();

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
      <label htmlFor="book-search">Search by {"Sth"}</label>
      <br />
      <input type="search" name="book-search" id="book-search" />
    </form>
  );
}

export default SearchBar;
