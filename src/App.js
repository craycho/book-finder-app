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

/**@todo Fix CSS and remove unnecessary classes for Favorites modal */
/**@todo Add a other books by this author feature */
