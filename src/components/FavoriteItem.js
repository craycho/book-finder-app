import { useContext } from "react";
import { Context as BooksContext } from "../context/books-context";
import setFavoriteProp from "../util/setFavoriteProp";

import styles from "./FavoriteItem.module.css";
import { SiBookstack } from "react-icons/si";
import noImage from "../assets/no-image-available.jpg";
import FavoriteButton from "./FavoriteButton";

function BookInfo(props) {
  const { book } = props;
  const booksContext = useContext(BooksContext);
  /** @todo MAKE NOTIFICATIONS WORK IN FAVORITES MODAL */
  /*
  const [notification, setNotification] = useState({
    visible: false,
    text: "",
    success: undefined,
  }); */

  const removeFavoriteHandler = () => {
    booksContext.removeFavorite(book);
    const newBooks = setFavoriteProp(booksContext.displayedBooks, book);
    booksContext.changeDisplayedBooks(newBooks);

    const favorites = JSON.parse(localStorage.getItem("favorites"));
    const newFavorites = favorites.filter((fav) => fav.id !== book.id);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

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
        <b>Author:</b>{" "}
        {book.info.authors?.length > 0
          ? book.info.authors.join(" ")
          : "Unknown"}{" "}
        <span className={styles.break} /> <b>Published:</b>{" "}
        {book.info?.publishedDate || "Unknown"}
        <span className={styles.break} />
        {book.info?.subtitle || ""}
      </div>

      <FavoriteButton book={book} />
    </div>
  );
}

export default BookInfo;

/* const setFavoriteProp = () => {
    const newBooks = booksContext.displayedBooks.map((displayedBook) => {
      if (displayedBook.id === book.id) {
        return { ...displayedBook, favorite: !book.favorite };
      }
      return displayedBook;
    });

    return newBooks;
  }; */
