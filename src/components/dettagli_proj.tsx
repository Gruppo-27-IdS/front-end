import React, { useEffect, useState } from "react";
import { root } from "../main";
import My_proj from "../pagine/Projects/my_proj";
import { show_profile, utente } from "../logica/funzioni";
import Manager_button from "./manager_menu";
import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = "http://localhost:5000/api/get_proj_by_id";

interface MyComponentProps {
  parametroNumero: string;
  comp: JSX.Element;
}
interface proj {
  _id: string;
  name: string;
  description: string;
  category: string;
  start_date: Date;
  end_date: Date;
  opensource: boolean;
  images: string[];
  __v: number;
}
let l = ["ciao", "titti", "pluto"];
let premi = ["premio 1", "premio 2", "premio 3"];
let tuo = false; //progetto presente nei tuoi (o manager o collaboratore)

//liv -1 non loggato (vede descrizioni progetti)
//liv 0 loggato (vede lista collaboratori e premi, può supportare e richiedere di collaborare)
//liv 1 supporter (mostra premi raggiunti nel menu)
//liv 2 collaboratore (crea, modifica, elimina news, mostra insights progetto, mostra lista supporter)
//liv 3 manager (gestisci attività, ruoli collaboratori, accetta/rifiuta richieste di partecipazione,
// rimuovi collaboratore, gestisci chat, definisci premi, modifica, elimina progetto, mostra richieste e premi raggiunti)

function autenticazione_livello(str: string) {
  if (utente.username === "") return -1;
  else {
    if (str.length < 5) return 0;
    else if (str.length === 5) return 1;
    else if (str.length > 5 && str.length < 8) return 2;
    else if (str.length > 5) return 3;
    else return -1;
  }
}

const MyComponent: React.FC<MyComponentProps> = ({ parametroNumero, comp }) => {
  //let progetto = parametroNumero;

  const livello = autenticazione_livello("12345678");
  const [project, setProject] = useState<proj>({
    _id: "",
    name: "",
    description: "",
    category: "",
    start_date: new Date(),
    end_date: new Date(),
    opensource: false,
    images: [],
    __v: 0,
  });

  const get_dati = () => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          apiUrl,
          {
            project_id: parametroNumero,
          },
          {
            headers: {
              token: Cookies.get("authToken"),
            },
          }
        );
        setProject({
          _id: response.data.project._id,
          name: response.data.project.name,
          description: response.data.project.description,
          category: response.data.project.category,
          start_date: response.data.project.start_date,
          end_date: response.data.project.end_date,
          opensource: response.data.project.opensource,
          images: response.data.project.images,
          __v: response.data.project.__v,
        });
      } catch (error: any) {
        console.error("Errore durante il recupero dei dati:", error.message);
      }
    };
    fetchData();
  };

  useEffect(() => {
    get_dati();
  }, []);
  return (
    <>
      <button
        type="button"
        className="btn-close p-10"
        aria-label="Close"
        onClick={() => root.render(comp)}
      ></button>
      <div className="row row-cols-1 row-cols-md-1 g-4 jj">
        <div className="col">
          <div className=" mb-3 h-100">
            <img
              src={project.images.length > 0 ? project.images[0] : ""}
              className="card-img-top"
              alt=""
            />
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: 25 }}>
                {project.name}
              </h5>
              <p className="news-text" style={{ fontSize: 20 }}>
                {project.description}
              </p>
              <div
                className={
                  project.images.length === 0 ? "" : "image-scroll-container"
                }
              >
                {project.images.map((x) => (
                  <img
                    src={
                      "http://localhost:5000/back-end/projects_images/1706195065058_.jpg"
                    }
                    className="card-img-top k"
                    height="250px"
                    alt="..."
                    key={x}
                  />
                ))}
              </div>
              <p className="news-text">Data di creazione: {project.category}</p>
              <p
                className="news-text"
                onClick={() =>
                  show_profile(
                    "3",
                    <MyComponent
                      parametroNumero={parametroNumero}
                      comp={comp}
                    />
                  )
                }
              >
                {/*MANCA NOME MANAGER */}
                Creato da: @{project.name}
              </p>
              {livello < 0 ? (
                <>
                  Per supportare, collaborare e interagire con un progetto
                  accedi o registrati
                </>
              ) : (
                <>
                  <div className="list-group jj">
                    <p>Lista collaboratori:</p>
                    {l.map((item) => (
                      <button
                        type="button"
                        className="list-group-item list-group-item-action "
                        aria-current="true"
                        style={{ fontSize: 20 }}
                        key={item}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="list-group jj">
                    <p>Lista premi:</p>
                    {premi.map((item) => (
                      <button
                        type="button"
                        className="list-group-item list-group-item-action "
                        aria-current="true"
                        style={{ fontSize: 20 }}
                        key={item}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {livello > 1 ? (
                <>
                  <div className="list-group jj">
                    <p>Lista supporter:</p>
                    {l.map((item) => (
                      <button
                        type="button"
                        className="list-group-item list-group-item-action "
                        aria-current="true"
                        style={{ fontSize: 20 }}
                        key={item}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p></p>
              )}
              <div className="ls-bt">
                <div className="d-grid gap-3 ">
                  {livello < 3 && livello > -1 ? (
                    <a
                      className="btn bg-color-mod white btn-mod-2 d-flex justify-content-center"
                      href="#"
                      role="button"
                    >
                      <b>Supporta</b>
                    </a>
                  ) : (
                    <></>
                  )}

                  {livello === 0 || livello === 1 ? (
                    <a
                      className="btn bg-color-mod white btn-mod-2 d-flex justify-content-center"
                      href="#"
                      role="button"
                    >
                      <b>Collabora</b>
                    </a>
                  ) : (
                    <></>
                  )}
                  {livello > 1 ? (
                    <>
                      <a
                        className="btn bg-color-mod white btn-mod-2 d-flex justify-content-center"
                        href="#"
                        role="button"
                      >
                        <b>Crea News</b>
                      </a>
                      <a
                        className="btn bg-color-mod white btn-mod-2 d-flex justify-content-center"
                        href="#"
                        role="button"
                      >
                        <b>Modifica News</b>
                      </a>
                      <a
                        className="btn bg-color-mod white btn-mod-2 d-flex justify-content-center"
                        href="#"
                        role="button"
                      >
                        <b>Insights</b>
                      </a>
                    </>
                  ) : (
                    <p></p>
                  )}
                  {livello === 3 ? <Manager_button></Manager_button> : <p></p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyComponent;
