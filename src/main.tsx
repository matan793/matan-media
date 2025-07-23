import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ScreenWidthProvider } from "./context/ScreenWidth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

  <ScreenWidthProvider>
    <App />
  </ScreenWidthProvider>

);
