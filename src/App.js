import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Error from "./components/Error";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <Error /> },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;

/**@todo Favorites and X move with the favorite items, fix it */
/**@todo Add an other books by this author feature */
/**@todo Add proper folders for the components (npr. cart, layout, shop, UI) */
/**@todo Fix CSS and remove unnecessary classes for Favorites modal */
