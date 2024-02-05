import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import BottomNav from "./pagine/bot-nav";
import TopBar from "./pagine/top-bar";

export const baseUrl =
  "https://you-project-backend-3fc4476a9bed.herokuapp.com/api/";
export const baseUrlImg =
  "https://you-project-backend-3fc4476a9bed.herokuapp.com/";
export const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const rootTopBar = ReactDOM.createRoot(
  document.getElementById("Topbar") as HTMLElement
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
rootTopBar.render(
  <React.StrictMode>
    <TopBar />
  </React.StrictMode>
);
