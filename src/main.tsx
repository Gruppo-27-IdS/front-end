import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import BottomNav from "./pagine/bot-nav";
import TopBar from "./pagine/top-bar";
import TopBar2 from "./pagine/top-bar2";
export const baseUrl = "http://localhost:5000/api/";
export const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const rootTopBar = ReactDOM.createRoot(
  document.getElementById("Topbar") as HTMLElement
);
root.render(
  <React.StrictMode>
    <p>ciao</p>
  </React.StrictMode>
);
ReactDOM.createRoot(document.getElementById("navBar") as HTMLElement).render(
  <React.StrictMode>
    <BottomNav />
  </React.StrictMode>
);
rootTopBar.render(
  <React.StrictMode>
    <TopBar />
  </React.StrictMode>
);
