import { createContext, useCallback, useState } from "react";

function getIntialFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  return favorites || [];
}

export const Context = createContext({
  displayedBooks: [],
  changeDisplayedBooks: (results) => {},
  favorites: [],
  addFavorite: (newFavorite) => {},
  removeFavorite: (removedFavorite) => {},
});

const ContextProvider = (props) => {
  const [favorites, setFavorites] = useState(getIntialFavorites);
  const [displayedBooks, setDisplayedBooks] = useState([]);

  const changeDisplayedBooks = useCallback(
    (results) => {
      setDisplayedBooks(results);
    },
    [setDisplayedBooks]
  );

  const addFavorite = (newFavorite) => {
    setFavorites((favorites) => [...favorites, newFavorite]);
  };

  const removeFavorite = (removedFavorite) => {
    const newFavorites = favorites.filter(
      (fav) => fav.id !== removedFavorite.id
    );
    setFavorites(newFavorites);
  };

  return (
    <Context.Provider
      value={{
        displayedBooks: displayedBooks,
        changeDisplayedBooks: changeDisplayedBooks,
        favorites: favorites,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
