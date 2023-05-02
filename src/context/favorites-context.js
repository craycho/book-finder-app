import { createContext, useState } from "react";

export const Context = createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

const ContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (newFavorite) => {
    setFavorites((favorites) => [...favorites, newFavorite]);
    console.log(favorites);
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
