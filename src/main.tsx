import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import BottomNav from "./pagine/bot-nav";
import TopBar from "./pagine/top-bar";
import TopBar2 from "./pagine/top-bar2";
import Home from "./pagine/News/home";
import Exp from "./pagine/Projects/explore";
import Plus from "./pagine/Projects/plus";
import My_proj from "./pagine/Projects/my_proj";
import Profile from "./pagine/User/profile";
import Notif from "./pagine/notification";
import Message from "./pagine/message";
import Login from "./pagine/User/login";

window.onpopstate = function (event) {
  if (event.state.page === "home") root.render(<Home />);
  if (event.state.page === "explore") root.render(<Exp />);
  if (event.state.page === "plus") root.render(<Plus />);
  if (event.state.page === "projects") root.render(<My_proj />);
  if (event.state.page === "profile") root.render(<Profile />);
  if (event.state.page === "notif") root.render(<Notif comp={<Home />} />);
  if (event.state.page === "message") root.render(<Message comp={<Home />} />);
  if (event.state.page === "login") root.render(<Login />);
};

export const baseUrl =
  "https://you-project-backend-3fc4476a9bed.herokuapp.com/api/";
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
