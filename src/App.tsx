import InstegramPostDemo from "./InstegramPostDemo";
import { invoke } from "@tauri-apps/api/core";
import {
  createHashRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
function App() {
  const routes: RouteObject[] = [
    {
      // index: true,
      element: <InstegramPostDemo />,
      path: "/",
    },
    {
      index: true,
      path: "/m",
      element: <h1>mirav</h1>,
    },
  ];
  const router = createHashRouter(routes);
  // invoke('register_user', { username: 'demo', password: '123456', email: 'd@gmail.com'})
  return (
    <main className="container">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
