import React, { useEffect, useState } from "react";
import { root, rootTopBar } from "../main";
import My_proj from "../pagine/Projects/my_proj";
import { Utente, show_profile, utente } from "../logica/funzioni";
import Manager_button from "./manager_menu";
import axios from "axios";
import Cookies from "js-cookie";
import Crea_news from "../pagine/News/crea_news";
import Comp from "./gg";
import { baseUrl } from "../main";
import TopBar from "../pagine/top-bar";
const apiUrl = "get_proj_by_id";
const apiUrl1 = "get_user_role";
const apiUrl3 = "get_collabs_from_proj";
let livello = 0;
interface MyComponentProps {
  parametroNumero: string;
  comp: JSX.Element;
}
export interface user {
  _id: string;
  username: string;
  name: string;
  surname: string;
  age: number;
  phone: string;
  email: string;
  password: string;
  supported_projects: number;
  created: string;
  __v: number;
}
export interface proj {
  _id: string;
  name: string;
  description: string;
  category: string;
  start_date: Date;
  end_date: Date;
  opensource: boolean;
  images: string[];
  __v: number;
  user: user;
}

//liv -1 non loggato (vede descrizioni progetti)
//liv 0 loggato (vede lista collaboratori e premi, può supportare e richiedere di collaborare)
//liv 1 supporter (mostra premi raggiunti nel menu)
//liv 2 collaboratore (crea, modifica, elimina news, mostra insights progetto, mostra lista supporter)
//liv 3 manager (gestisci attività, ruoli collaboratori, accetta/rifiuta richieste di partecipazione,
// rimuovi collaboratore, gestisci chat, definisci premi, modifica, elimina progetto, mostra richieste e premi raggiunti)

const MyComponent: React.FC<MyComponentProps> = ({ parametroNumero, comp }) => {
  rootTopBar.render(<TopBar />);
  let project = {
    _id: "",
    name: "",
    description: "",
    category: "",
    start_date: new Date(),
    end_date: new Date(),
    opensource: false,
    images: [],
    __v: 0,
    user: {
      _id: "",
      username: "",
      name: "",
      surname: "",
      age: 0,
      phone: "",
      email: "",
      password: "",
      supported_projects: 0,
      created: "",
      __v: 0,
    },
  };

  const get_dati = () => {
    const fetchData = async () => {
      try {
        const response = await axios.post(baseUrl + apiUrl, {
          project_id: parametroNumero,
        });

        project._id = response.data.project._id;
        project.name = response.data.project.name;
        project.description = response.data.project.description;
        project.category = response.data.project.category;
        project.start_date = response.data.project.start_date;
        project.end_date = response.data.project.end_date;
        project.opensource = response.data.project.opensource;
        project.images = response.data.project.images;
        project.__v = response.data.project.__v;
        project.user = response.data.user;

        try {
          const response2 = await axios.post(
            baseUrl + apiUrl1,
            {
              user_id: utente._id,
              project_id: parametroNumero,
            },
            {
              headers: {
                token: Cookies.get("authToken"),
              },
            }
          );

          const response = await axios.post(
            baseUrl + apiUrl3,
            {
              project_id: project._id,
            },
            {
              headers: {
                token: Cookies.get("authToken"),
              },
            }
          );
          let collaboratori = [];
          if (response.data.message === "Collaborators found!") {
            collaboratori = response.data.collaborators;
          } else {
            collaboratori = [];
          }

          console.log(project.user);
          console.log(response2.data.role_id);
          livello = response2.data.role_id;

          root.render(
            <Comp
              comp={comp}
              livello={livello}
              project={project}
              collaboratori={collaboratori}
            />
          );
        } catch (error: any) {
          root.render(
            <Comp
              comp={comp}
              livello={livello}
              project={project}
              collaboratori={[]}
            />
          );
        }
      } catch (error: any) {
        console.error("Errore durante il recupero dei dati:", error.message);
      }
    };
    fetchData();
  };

  useEffect(() => {
    get_dati();
  }, []);

  return <></>;
};

export default MyComponent;
