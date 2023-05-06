import styles from "./FavoriteItem.module.css";
import { SiBookstack } from "react-icons/si";

import noImage from "../assets/no-image-available.jpg";

import { useContext } from "react";
import { Context as FavoritesContext } from "../context/favorites-context";

function BookInfo(props) {
  const { book } = props;
  const favContext = useContext(FavoritesContext);

  const setFavoriteProp = () => {
    const newBooks = favContext.displayedBooks.map((displayedBook) => {
      if (displayedBook.id === book.id) {
        return { ...displayedBook, favorite: !book.favorite };
      }
      return displayedBook;
    });

    return newBooks;
  };

  const removeFavoriteHandler = () => {
    favContext.removeFavorite(book);
    favContext.changeDisplayedBooks();

    const favorites = JSON.parse(localStorage.getItem("favorites"));
    const newFavorites = favorites.filter((fav) => fav.id !== book.id);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));

    const newBooks = setFavoriteProp();
    favContext.changeDisplayedBooks(newBooks);
  };

  return (
    <div className={styles.book}>
      <a
        href={book.info.infoLink}
        rel="noopener"
        target="_blank"
        className={styles["book-title"]}
      >
        {book.info.title || "Untitled"}
      </a>
      <a href={book.info.infoLink} rel="noopener" target="_blank">
        <img
          src={book.info.imageLinks?.thumbnail || noImage}
          alt="book-cover"
        />
      </a>
      <div className={styles["book-description"]}>
        <b>Author:</b>{" "}
        {book.info.authors?.length > 0
          ? book.info.authors.join(" ")
          : "Unknown"}{" "}
        <span className={styles.break} /> <b>Published:</b>{" "}
        {book.info?.publishedDate || "Unknown"}
        <span className={styles.break} />
        {book.info?.subtitle || ""}
      </div>

      <SiBookstack
        className={styles["favorites-icon"]}
        onClick={removeFavoriteHandler}
      />
    </div>
  );
}

export default BookInfo;
