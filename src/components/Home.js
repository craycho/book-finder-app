import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Home.module.css";
import SearchMenu from "./SearchMenu";

const API_KEY = "AIzaSyB6EzRjXUNpB23ivuekvxOAyzpnBu0aaRk";
const searchTerm = "dragon";
const searchAuthor = "martin";
let url = `https://www.googleapis.com/books/v1/volumes?&printType=books&q=${searchTerm}&key=${API_KEY}`;
let isInitial = true;

function Home() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [searchParams] = useSearchParams();
  const searchMode = searchParams.get("search");
  if (searchMode === "title") {
    url = `https://www.googleapis.com/books/v1/volumes?&printType=books&q=${searchTerm}+intitle:${searchQuery}&key=${API_KEY}`;
  } else if (searchMode === "author") {
    url = `https://www.googleapis.com/books/v1/volumes?&printType=books&q=${searchTerm}+inauthor:${searchQuery}&key=${API_KEY}`;
  } else if (searchMode === "subject") {
    url = `https://www.googleapis.com/books/v1/volumes?&printType=books&q=${searchTerm}+subject:${searchQuery}&key=${API_KEY}`;
  }
  console.log(searchMode);

  /**@todo Ne radi kada se pritisne back, rezultati se svakako displayayu. */
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    const searchBooks = async function () {
      const response = await fetch(`${url}`);
      const resData = await response.json();

      // Displaying results
      const bookResults = resData.items.map((res) => {
        return {
          id: res.id,
          info: res.volumeInfo,
        };
      });
      //   console.log(bookResults);
      setBooks([...bookResults]);
    };

    searchBooks();
  }, [searchQuery]);

  function searchFormSubmitHandler(event) {
    event.preventDefault();
    setSearchQuery(event.target["book-search"].value);
  }

  return (
    <div className="App">
      <header className={styles["hero-header"]}>
        {searchMode && (
          <form className={styles.form} onSubmit={searchFormSubmitHandler}>
            <label htmlFor="book-search">Search books or sth nigga idk:</label>
            <br />
            <input type="search" name="book-search" id="book-search" />
          </form>
        )}
        <SearchMenu />
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
