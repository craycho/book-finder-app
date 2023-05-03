import styles from "./BookInfo.module.css";
import { SiBookstack } from "react-icons/si";
import noImage from "../assets/no-image-available.jpg";

import { useContext, useState } from "react";
import { Context as FavoritesContext } from "../context/favorites-context";

function BookInfo(props) {
  const { book } = props;
  const [showNotification, setShowNotification] = useState(false);
  const favContext = useContext(FavoritesContext);

  // console.log(book);

  const addFavoriteHandler = () => {
    setShowNotification(true);
    favContext.addFavorite(book);
    setTimeout(() => {
      setShowNotification(false);
    }, 1000);
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
      {showNotification && (
        <div className={styles["added-notification"]}>Added to favorites ✓</div>
      )}
    </div>
  );
}

export default BookInfo;
