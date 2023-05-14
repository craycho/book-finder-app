import styles from "./SearchItem.module.css";
import noImage from "../../assets/no-image-available.jpg";
import FavoriteButton from "../Favorites/FavoriteButton";
import RecommendAuthor from "../Recommend/RecommendAuthor";

function SearchItem({ book }) {
  const recommendAuthorHandler = () => {};
  console.log(book);

  return (
    <div className={styles.book}>
      <a
        href={book.info.infoLink}
        rel="noreferrer"
        target="_blank"
        className={styles["book-title"]}
      >
        {book.info.title || "Untitled"}
      </a>

      <a href={book.info.infoLink} rel="noreferrer" target="_blank">
        <img
          src={book.info.imageLinks?.thumbnail || noImage}
          alt="book-cover"
        />
      </a>
      <div className={styles["book-description"]}>
        <b>Author: </b>
        {book.info.authors?.length > 0
          ? book.info.authors.join(", ")
          : "Unknown"}
        <span className={styles.break} /> <b>Published: </b>
        {book.info?.publishedDate || "Unknown"}
        <span className={styles.break} />
        <p className={styles.subtitle}>{book.info?.subtitle || ""}</p>
      </div>
      <div className={styles["recommend-buttons"]}>
        <button
          className={styles["btn-author"]}
          onClick={recommendAuthorHandler}
        >
          More by this author
        </button>
        <button
          className={styles["btn-recommend"]}
          onClick={recommendAuthorHandler}
        >
          More books like this
        </button>
      </div>
      <FavoriteButton book={book} />
    </div>
  );
}

export default SearchItem;
