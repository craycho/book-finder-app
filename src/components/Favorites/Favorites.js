import { useState } from "react";
import FavoritesModal from "./FavoritesModal";

import { SiBookstack } from "react-icons/si";
import styles from "./Favorites.module.css";

function Favorites(props) {
  const [isVisible, setIsVisible] = useState(false);

  const showFavoritesHandler = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  return (
    <div className={styles.favorites}>
      <SiBookstack
        className={
          isVisible
            ? styles["favorites-icon__clicked"]
            : styles["favorites-icon"]
        }
        onClick={showFavoritesHandler}
      />
      {isVisible && (
        <FavoritesModal
          onWrapperClick={showFavoritesHandler}
          onRecommend={props.onRecommend}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
      )}
    </div>
  );
}

export default Favorites;
