import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Home.module.css";
import SearchMenu from "./SearchMenu";

const API_KEY = "AIzaSyB6EzRjXUNpB23ivuekvxOAyzpnBu0aaRk";
const searchTerm = "dragon";
const searchAuthor = "martin";

function Home() {
  const [searchParams] = useSearchParams();

  const [books, setBooks] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const searchBooks = async function () {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?&printType=books&q=${searchTerm}&key=${API_KEY}`
      );
      // `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}+inauthor:${searchAuthor}&key=${API_KEY}&maxResults=40&printType=books`
      const resData = await response.json();
      console.log(resData);

      // Displaying results
      const bookResults = resData.items.map((res) => {
        return {
          id: res.id,
          info: res.volumeInfo,
        };
      });
      console.log(bookResults);
      setBooks([...bookResults]);
    };

    searchBooks();
  }, []);

  return (
    <div className="App">
      <header className={styles["hero-header"]}>
        {searchVisible && (
          <form className={styles.form}>
            <label htmlFor="book-search">Search books or sth nigga idk:</label>
            <br />
            <input type="search" name="book-search" />
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
