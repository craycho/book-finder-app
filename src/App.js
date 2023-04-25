import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useSearchParams,
} from "react-router-dom";

import Home from "./components/Home";

const router = createBrowserRouter([{ path: "/", element: <Home /> }]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
