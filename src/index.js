import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import FavoritesContextProvider from "./context/favorites-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FavoritesContextProvider>
    <App />
  </FavoritesContextProvider>
);
