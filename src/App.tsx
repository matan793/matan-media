import InstegramPostDemo from "./InstegramPostDemo";
import { invoke } from '@tauri-apps/api/core';

function App() {
  // invoke('get_posts').then((posts) => {
  //   console.log('Posts:', posts);
  // }).catch((error) => {
  //   console.error('Error fetching posts:', error);
  // });


  return (
    <main className="container">
      <InstegramPostDemo />
    </main>
  );
}

export default App;
