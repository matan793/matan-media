import InstegramPostDemo from "./InstegramPostDemo";
import { invoke } from '@tauri-apps/api/core';
import { createHashRouter, RouteObject, RouterProvider } from 'react-router-dom';
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
    }
  ]
  const router = createHashRouter(routes);
  invoke('login_user', {username: 'matan', email: 'miravv@gmail.com', password: '1234'}).then((response) => {
    console.log('User registered:', response);
  }).catch((error) => {
    console.error('Error registering user:', error);
  });
  return (
    <main className="container">
     {/* <RouterProvider router={router} /> */}
     mirav
    </main>
  );
}

export default App;
