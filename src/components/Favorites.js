import { useContext, useState } from "react";
import { Context as FavoritesContext } from "../context/favorites-context";
import BookInfo from "./BookInfo";

import { SiBookstack } from "react-icons/si";
import styles from "./Favorites.module.css";

function Favorites() {
  const [isHovered, setIsHovered] = useState(false);
  const [favoritesVisible, setFavoritesVisible] = useState(false);
  const favContext = useContext(FavoritesContext);

  const mouseEnterHandler = () => {
    setIsHovered(true);
  };
  const mouseLeaveHandler = () => {
    setIsHovered(false);
  };

  const showFavoritesHandler = () => {
    setFavoritesVisible(true);
  };

  return (
    <div className={styles.favorites}>
      <SiBookstack
        className={styles["favorites-icon"]}
        onMouseLeave={mouseLeaveHandler}
        onClick={showFavoritesHandler}
      />
      {favoritesVisible && (
        <ul className={styles["favorites-list"]}>
          {favContext.favorites.map((fav) => (
            <BookInfo key={fav.id} book={fav} />
          ))}
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
