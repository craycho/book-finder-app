import { useContext, useState } from "react";
import { Context as BooksContext } from "../context/books-context";
import setFavoriteProp from "../util/setFavoriteProp";

import styles from "./FavoriteButton.module.css";
import { SiBookstack } from "react-icons/si";

function FavoriteButton(props) {
  const { book } = props;
  const booksContext = useContext(BooksContext);
  const displayedBooks = booksContext.displayedBooks || [];
  const [notification, setNotification] = useState({
    visible: false,
    text: "",
    success: undefined,
  });

  const setFavoriteHandler = () => {
    const alreadyFavorited = booksContext.favorites.some(
      (fav) => fav.id === book.id
    );

    if (alreadyFavorited) {
      booksContext.removeFavorite(book);
      const favorites = JSON.parse(localStorage.getItem("favorites"));
      const newFavorites = favorites.filter((fav) => fav.id !== book.id);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));

      const newBooks = setFavoriteProp(displayedBooks, book);
      booksContext.changeDisplayedBooks(newBooks);

      setNotification({
        visible: true,
        text: "Removed from favorites ✖",
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
      booksContext.addFavorite({ ...book, favorite: true });

      // Add favorite book to local storage
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites.push({ ...book, favorite: true });
      localStorage.setItem("favorites", JSON.stringify(favorites));

      setTimeout(() => {
        setNotification({ visible: false, text: "", success: undefined });
      }, 1000);

      // Changes "favorite" property in the state of the currently displayed book
      const newBooks = setFavoriteProp(displayedBooks, book);
      booksContext.changeDisplayedBooks(newBooks);
    }
  };

  return (
    <>
      <SiBookstack
        className={
          book.favorite
            ? styles["favorites-icon__favorited"]
            : styles["favorites-icon"]
        }
        onClick={setFavoriteHandler}
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
    </>
  );
}

export default FavoriteButton;
