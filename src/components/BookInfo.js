import styles from "./BookInfo.module.css";
import { SiBookstack } from "react-icons/si";
import noImage from "../assets/no-image-available.jpg";

import { useContext, useState } from "react";
import { Context as FavoritesContext } from "../context/favorites-context";

function BookInfo(props) {
  const favContext = useContext(FavoritesContext);
  const { book, booksState, setBooksState } = props;
  const [notification, setNotification] = useState({
    visible: false,
    text: "",
    success: undefined,
  });

  const setFavoriteProp = () => {
    const newBooks = booksState.map((b) => {
      if (b.id === book.id) {
        return { ...b, favorite: !book.favorite };
      }
      return b;
    });

    return newBooks;
  };

  const addFavoriteHandler = () => {
    const alreadyFavorited = favContext.favorites.some(
      (fav) => fav.id === book.id
    );

    if (alreadyFavorited) {
      favContext.removeFavorite(book);
      const favorites = JSON.parse(localStorage.getItem("favorites"));
      const newFavorites = favorites.filter((fav) => fav.id !== book.id);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      const newBooks = setFavoriteProp();
      setBooksState(newBooks);

      setNotification({
        visible: true,
        text: "Already favorited ✖",
        success: false,
      });
      setTimeout(() => {
        setNotification({ visible: false, text: "", success: undefined });
      }, 1000);
    } else {
      setNotification({
        visible: true,
        text: "Added to favorites ✓",
        success: true,
      });

      // Add favorite book to context
      favContext.addFavorite({ ...book, favorite: true });

      // Add favorite book to local storage
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites.push({ ...book, favorite: true });
      localStorage.setItem("favorites", JSON.stringify(favorites));

      setTimeout(() => {
        setNotification({ visible: false, text: "", success: undefined });
      }, 1000);

      // Changes "favorite" property in the state of the currently displayed book
      const newBooks = setFavoriteProp();
      setBooksState(newBooks);
    }
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
        className={
          book.favorite
            ? styles["favorites-icon__favorited"]
            : styles["favorites-icon"]
        }
        onClick={addFavoriteHandler}
      />
      {notification.visible && (
        <div
          className={styles[`added-notification`]}
          style={{
            backgroundColor: notification.success
              ? "rgba(81, 163, 81)"
              : "rgba(255,57,46,255)",
          }}
        >
          {notification.text}
        </div>
      )}
    </div>
  );
}

export default BookInfo;
