import { useState } from "react";
import FavoritesModal from "./FavoritesModal";

import { SiBookstack } from "react-icons/si";
import styles from "./Favorites.module.css";

function Favorites() {
  const [isVisible, setIsVisible] = useState(false);

  const showFavoritesHandler = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  return (
    <div className={styles.favorites}>
      <SiBookstack
        className={styles["favorites-icon"]}
        onClick={showFavoritesHandler}
      />
      {isVisible && <FavoritesModal onWrapperClick={showFavoritesHandler} />}
    </div>
  );
}

export default Favorites;
