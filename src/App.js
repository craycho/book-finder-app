import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Error from "./pages/Error";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <Error /> },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;

/**@todo Proper error handling inside Search.js (with response.ok) */
/**@todo Can't search same term after clicking logo to go back to home */
/**@todo Favorites and X move with the favorite items, fix it */
/**@todo Add an other books by this author feature */
/**@todo Fix CSS and remove unnecessary classes for Favorites modal */
