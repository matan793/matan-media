import InstegramPostDemo from "./InstegramPostDemo";
import { invoke } from "@tauri-apps/api/core";
import {
  createHashRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import {ObjectId, BSON} from 'bson';
import { Post, User } from "./utils/types";
import { open } from "@tauri-apps/plugin-dialog";
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

  async function selectImages(): Promise<string[]> {
    const selected = await open({
      multiple: true,
      filters: [{ name: "Images", extensions: ["png", "jpg", "jpeg"] }],
    });

    if (!selected) return [];
    return Array.isArray(selected) ? selected : [selected];
  }
  async function handleCreatePost() {
    const users: User[] = await invoke<User[]>("get_all_users");
    console.log("Users:", users);
    
    const image_paths = await selectImages();
    console.log('selected images:', image_paths);
    
    const post: Partial<Post> = {
      content: "My Post Title",
      media: [],
      user: users[0],
      user_id: users[0].id, 
      created_at: null, // Assuming you want to set the current date
      likes_count: 0,
      comments: [],
    };
    console.log(post);
    
    try {
      await invoke("create_post", {
        post,
        image_paths,
      });
      console.log("Post created successfully");
    } catch (e) {
      console.error("Error creating post:", e);
    }
  }
  handleCreatePost();
  return (
    <main className="container">
      {/* <RouterProvider router={router} /> */}
    </main>
  );
}

export default App;
