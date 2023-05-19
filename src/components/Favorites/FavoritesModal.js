import { useContext } from "react";
import { Context as BooksContext } from "../../context/books-context";
import FavoriteItem from "./FavoriteItem";

import { SiBookstack } from "react-icons/si";
import { ImCross } from "react-icons/im";
import styles from "./FavoritesModal.module.css";

function BookInfo(props) {
  const booksContext = useContext(BooksContext);

  return (
    <>
      <div className={styles.wrapper} onClick={props.onWrapperClick}></div>
      <div className={styles["favorites-header"]}>
        {booksContext.favorites.length > 0 && (
          <p className={styles.title}>Favorites</p>
        )}
        <ImCross
          className={styles["close-icon"]}
          onClick={props.onWrapperClick}
        />
      </div>
      <div className={styles["favorites-modal"]}>
        <div className={styles["favorites-container"]}>
          {booksContext.favorites.length > 0 ? (
            <>
              {booksContext.favorites.map((fav) => (
                <FavoriteItem
                  key={fav.id}
                  book={fav}
                  onRecommend={props.onRecommend}
                  isVisible={props.isVisible}
                  setIsVisible={props.setIsVisible}
                />
              ))}
            </>
          ) : (
            <>
              <p className={styles.empty}>No favorite books added!</p>
              <p className={styles["empty-instruction"]}>
                Try adding a favorite book by pressing the{" "}
                <SiBookstack className={styles["empty-icon"]} /> icon next to
                any search result.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default BookInfo;
