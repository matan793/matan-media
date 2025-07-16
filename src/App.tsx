import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import InstegramPostDemo from "./InstegramPostDemo";

function App() {


  return (
    <main className="container">
      <InstegramPostDemo />
    </main>
  );
}

export default App;
