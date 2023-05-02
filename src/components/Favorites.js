import { useContext, useState } from "react";
import { Context as FavoritesContext } from "../context/favorites-context";
import FavoritesInfo from "./FavoritesInfo";

import { SiBookstack } from "react-icons/si";
import styles from "./Favorites.module.css";

function Favorites() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const favContext = useContext(FavoritesContext);

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };
  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  const showFavoritesHandler = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  return (
    <div className={styles.favorites}>
      <SiBookstack
        className={styles["favorites-icon"]}
        onMouseLeave={mouseLeaveHandler}
        onClick={showFavoritesHandler}
      />
      {isVisible && (
        <ul className={styles["favorites-modal"]}>
          {favContext.favorites.length > 0 ? (
            favContext.favorites.map((fav) => (
              <FavoritesInfo key={fav.id} book={fav} />
            ))
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
        </ul>
      )}
    </div>
  );
}

export default Favorites;

/*  
  const [showText, setShowText] = useState(true);

// Hides text on smaller screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 980) {
        setShowText(false);
      } else {
        setShowText(true);
      }
    };
    console.log("Desio se");
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  
  return {showText && <p className={styles["favorites-text"]}>Favorites</p>};
  */
