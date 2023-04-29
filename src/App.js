import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home";
import Error from "./components/Error";

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <Error /> },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
