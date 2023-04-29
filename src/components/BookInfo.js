import styles from "./BookInfo.module.css";
import noImage from "../assets/no-image-available.jpg";

function BookInfo(props) {
  const { book } = props;
  console.log(book);

  return (
    <li className={styles.li}>
      <div className={styles.book}>
        <p>{book.info.title ?? "Untitled"}</p>
        <img src={book.info.imageLinks?.thumbnail || noImage} />
      </div>
    </li>
  );
}

export default BookInfo;

/* {book.info.title ?? "Untitled"} <br />
      {<img src={book.info.imageLinks.smallThumbnail} />}
      <strong>Author: </strong>
      {book.info.authors} */
