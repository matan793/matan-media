import InstegramPostDemo from "./InstegramPostDemo";
import { invoke } from "@tauri-apps/api/core";
import {
  createHashRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import { User } from "./utils/types";
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
  // invoke('register_user', { username: 'demo12', password: '123456', email: 'ASDASDgmail.com'})
  invoke<User[]>('get_all_users').then((res) => {
    res = res.map(user => ({
      ...user,
      joined_at: new Date(user.joined_at),
    }));
    console.log(res[0].joined_at.toLocaleDateString());
  }).catch((err) => {
    console.error(err);
  });

  return (
    <main className="container">
      {/* <RouterProvider router={router} /> */}
    </main>
  );
}

export default App;
