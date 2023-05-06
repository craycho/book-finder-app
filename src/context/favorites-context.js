import { createContext, useState } from "react";

function getIntialFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  return favorites || [];
}

export const Context = createContext({
  displayedBooks: [],
  changeDisplayedBooks: () => {},
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

const ContextProvider = (props) => {
  const [favorites, setFavorites] = useState(getIntialFavorites);
  const [displayedBooks, setDisplayedBooks] = useState(null);

  const changeDisplayedBooks = (results) => {
    setDisplayedBooks(results);
  };

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
