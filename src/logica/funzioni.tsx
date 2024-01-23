import Home from "../pagine/home";
import Notif from "../pagine/notification";
import Message from "../pagine/message";
import Profile from "../pagine/profile";
import Exp from "../pagine/explore";
import Plus from "../pagine/plus";
import My_proj from "../pagine/my_proj";
import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { root } from "../main";
import TopBar from "../pagine/top-bar";
import Prova from "../components/dettagli_proj";
import MyComponent from "../components/dettagli_proj";
import Dettagli_prof from "../components/dettagli_prof";
export let u_log = true;

export class News {
  news_data: string;
  news_title: string;
  news_description: string;
  u_project: string;
  u_name: string;
  fnews_src: string;
  g_news: string[];
  constructor(
    u_project: string,
    u_name: string,
    title: string,
    description: string,
    data: string,
    fprog_src: string,
    f_news: string[]
  ) {
    this.news_data = data;
    this.news_title = title;
    this.news_description = description;
    this.u_project = u_project;
    this.u_name = u_name;
    this.fnews_src = fprog_src;
    this.g_news = f_news;
  }
}

export class Project {
  proj_data: string;
  proj_title: string;
  proj_description: string;
  u_project: string;
  u_name: string;
  fproj_src: string;
  g_proj: string[];
  constructor(
    u_project: string,
    u_name: string,
    title: string,
    description: string,
    data: string,
    fprog_src: string,
    f_news: string[]
  ) {
    this.proj_data = data;
    this.proj_title = title;
    this.proj_description = description;
    this.u_project = u_project;
    this.u_name = u_name;
    this.fproj_src = fprog_src;
    this.g_proj = f_news;
  }
}

export class Utente {
  id: string;
  livello: number; //-1->non loggato 0->loggato 1->supporter 2->collaboratore 3->manager
  constructor(id: string, livello: number) {
    this.id = id;
    this.livello = livello;
  }
}

export let utente = new Utente("", -1);

export const lista_progetti_esplora = [
  new Project(
    "abc12",
    "tony",
    "progetto cupido",
    "ahjahjhajhjhsjhjahjhjhjhhjhjkahjkhjkahjkhjkhjkahjkhjkhjkhhfjkhjkhjkhjk",
    "23/01/2024",
    "exmp_img/davideMoscardelli.jpg",
    ["exmp_img/IMG_20221101_010102.jpg"]
  ),
];

export const lista_tuoi_progetti = [
  new Project(
    "def45",
    "tony",
    "progetto di prova",
    "jdfj fjfrojf rijfirjfi rihfirjif fhrijfijr rhfihrfrn rifhrijfi rhifjfir",
    "23/01/2024",
    "exmp_img/davideMoscardelli.jpg",
    []
  ),
];

export const handleClick = (
  str: string,
  event: React.MouseEvent<HTMLDivElement>
) => {
  const clickedElement = event.currentTarget as HTMLDivElement;
  const allNavLinks = document.querySelectorAll(".nav-link");
  allNavLinks.forEach((link) => link.classList.remove("active"));
  clickedElement.classList.add("active");
  clickedElement.classList.add("bg-hj");

  if (str === "home") {
    if (u_log) {
      const homeComponent = (
        <>
          <Home />
        </>
      );
      root.render(homeComponent);
    } else {
      const homeComponent = <h1>coglione</h1>;
      root.render(homeComponent);
    }
  } else if (str === "notif") {
    const homeComponent = (
      <>
        <Notif />
      </>
    );
    root.render(homeComponent);
  } else if (str === "chat") {
    const homeComponent = (
      <>
        <Message />
      </>
    );
    root.render(homeComponent);
  } else if (str === "profile") {
    const homeComponent = (
      <>
        <Profile />
      </>
    );
    root.render(homeComponent);
  } else if (str === "explore") {
    const homeComponent = (
      <>
        <Exp />
      </>
    );
    root.render(homeComponent);
  } else if (str === "plus") {
    const homeComponent = (
      <>
        <Plus />
      </>
    );
    root.render(homeComponent);
  } else if (str === "projects") {
    const homeComponent = (
      <>
        <My_proj />
      </>
    );
    root.render(homeComponent);
  } else {
    root.render(
      <div
        className="alert alert-danger d-flex align-items-center"
        role="alert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
          viewBox="0 0 16 16"
          width="40"
          role="img"
          aria-label="Warning:"
        >
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        <div>Errore nel caricamento della pagina</div>
      </div>
    );
  }
};
export const expand_proj = (id: string, comp: JSX.Element) => {
  root.render(
    <>
      <MyComponent parametroNumero={id} comp={comp} />
    </>
  );
};
export const show_profile = (id: number, comp: JSX.Element) => {
  root.render(
    <>
      <Dettagli_prof parametroNumero={id} comp={comp} />
    </>
  );
};
export const interaction = () => {};

export const search_exp = () => {};
export const imp_filter = () => {};

export const crea_proj = () => {};
export const mod_profile = () => {};

export const log_in = () => {
  u_log = true;
};
export const log_out = () => {
  u_log = false;
};
