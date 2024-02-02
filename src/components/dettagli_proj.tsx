import React, { useEffect, useState } from "react";
import { root } from "../main";
import My_proj from "../pagine/Projects/my_proj";
import { Utente, show_profile, utente } from "../logica/funzioni";
import Manager_button from "./manager_menu";
import axios from "axios";
import Cookies from "js-cookie";
import Crea_news from "../pagine/News/crea_news";
import Comp from "./gg";

const apiUrl = "http://localhost:5000/api/get_proj_by_id";
const apiUrl1 = "http://localhost:5000/api/get_proj_created";
let livello = false;
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
        const response = await axios.post(apiUrl, {
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
            apiUrl1,
            {
              user_id: utente._id,
            },
            {
              headers: {
                token: Cookies.get("authToken"),
              },
            }
          );

          console.log(project.user);
          livello = false;
          response2.data.forEach((project: proj) => {
            console.log(livello);
            if (project._id === parametroNumero) {
              livello = true;
            }
          });
          root.render(<Comp comp={comp} livello={livello} project={project} />);
        } catch (error: any) {
          console.error("Errore durante il recupero dei dati:", error.message);
          root.render(<Comp comp={comp} livello={livello} project={project} />);
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
