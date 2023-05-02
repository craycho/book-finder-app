import styles from "./BookInfo.module.css";
import { SiBookstack } from "react-icons/si";
import noImage from "../assets/no-image-available.jpg";

import { useContext } from "react";
import { Context as FavoritesContext } from "../context/favorites-context";

function BookInfo(props) {
  const { book } = props;
  const favContext = useContext(FavoritesContext);

  //   console.log(book);

  const removeFavoriteHandler = () => {
    favContext.removeFavorite(book);
    console.log("Desila se remove");
  };

  return (
    <div className={styles.book}>
      <div className={styles["book-title"]}>
        {book.info.title ?? "Untitled"}
      </div>
      <img src={book.info.imageLinks?.thumbnail || noImage} />
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
