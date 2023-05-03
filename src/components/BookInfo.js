import styles from "./BookInfo.module.css";
import { SiBookstack } from "react-icons/si";
import noImage from "../assets/no-image-available.jpg";

import { useContext, useState } from "react";
import { Context as FavoritesContext } from "../context/favorites-context";

function BookInfo(props) {
  const { book } = props;
  const [notification, setNotification] = useState({
    visible: false,
    text: "",
    green: true,
  });
  const favContext = useContext(FavoritesContext);

  // console.log(book);

  const addFavoriteHandler = () => {
    //
    // Checks to see if the added book was already favorited
    if (favContext.favorites.length < 1) {
      setNotification({
        visible: true,
        text: "Added to favorites ✓",
        green: true,
      });
      favContext.addFavorite(book);
      setTimeout(() => {
        setNotification({ visible: false, text: "", green: true });
      }, 1000);
    } else {
      const alreadyFavorited = favContext.favorites.some(
        (fav) => fav.id === book.id
      );

      if (alreadyFavorited) {
        setNotification({
          visible: true,
          text: "Already favorited ✖",
          green: false,
        });
        setTimeout(() => {
          setNotification({ visible: false, text: "", green: false });
        }, 1000);
      } else {
        setNotification({
          visible: true,
          text: "Added to favorites ✓",
          green: true,
        });
        favContext.addFavorite(book);
        setTimeout(() => {
          setNotification({ visible: false, text: "", green: true });
        }, 1000);
      }
    }
  };

  return (
    <div className={styles.book}>
      <div className={styles["book-title"]}>
        {book.info.title ?? "Untitled"}
      </div>
      <img src={book.info.imageLinks?.thumbnail || noImage} alt="book-cover" />
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
        onClick={addFavoriteHandler}
      />
      {notification.visible && (
        <div
          className={styles[`added-notification`]}
          style={{
            backgroundColor: notification.green
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
