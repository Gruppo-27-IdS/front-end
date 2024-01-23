import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import BottomNav from "./pagine/bot-top-nav";
import TopBar from "./pagine/top-bar";
export const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
ReactDOM.createRoot(document.getElementById("navBar") as HTMLElement).render(
  <React.StrictMode>
    <BottomNav />
  </React.StrictMode>
);
ReactDOM.createRoot(document.getElementById("Topbar") as HTMLElement).render(
  <React.StrictMode>
    <TopBar />
  </React.StrictMode>
);
