import React from "react";
import { root } from "../main";
import My_proj from "../pagine/my_proj";
import {
  Project,
  lista_progetti_esplora,
  lista_tuoi_progetti,
  show_profile,
  utente,
} from "../logica/funzioni";
import Manager_button from "./manager_menu";

interface MyComponentProps {
  parametroNumero: string;
  comp: JSX.Element;
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
  if (utente.id === "y") return -1;
  else {
    if (str.length < 5) return 0;
    else if (str.length === 5 && tuo) return 1;
    else if (str.length > 5 && tuo && str.length < 8) return 2;
    else if (str.length > 5 && tuo) return 3;
    else return -1;
  }
}

const MyComponent: React.FC<MyComponentProps> = ({ parametroNumero, comp }) => {
  let progetto = new Project("", "", "", "", "", "", []);

  lista_progetti_esplora.forEach((element) => {
    if (element.u_project === parametroNumero) {
      progetto = element;
      tuo = false;
    }
  });

  lista_tuoi_progetti.forEach((element) => {
    if (element.u_project === parametroNumero) {
      progetto = element;
      tuo = true;
    }
  });
  const livello = autenticazione_livello("12345678");

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
              src={progetto.g_proj.length > 0 ? progetto.g_proj[0] : ""}
              className="card-img-top"
              alt=""
            />
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: 25 }}>
                {progetto.proj_title}
              </h5>
              <p className="news-text" style={{ fontSize: 20 }}>
                {progetto.proj_description}
              </p>
              <div
                className={
                  progetto.g_proj.length === 0 ? "" : "image-scroll-container"
                }
              >
                {progetto.g_proj.map((x) => (
                  <img
                    src={x}
                    className="card-img-top k"
                    height="250px"
                    alt="..."
                    key={x}
                  />
                ))}
              </div>
              <p className="news-text">
                Data di creazione: {progetto.proj_data}
              </p>
              <p
                className="news-text"
                onClick={() =>
                  show_profile(
                    3,
                    <MyComponent
                      parametroNumero={parametroNumero}
                      comp={comp}
                    />
                  )
                }
              >
                Creato da: @{progetto.u_name}
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
