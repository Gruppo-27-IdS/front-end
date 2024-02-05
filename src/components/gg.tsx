import Cookies from "js-cookie";
import { show_profile } from "../logica/funzioni";
import { baseUrl, baseUrlImg, root } from "../main";
import Crea_news from "../pagine/News/crea_news";
import MyComponent, { proj, user } from "./dettagli_proj";
import Manager_button from "./manager_menu";
import FollowButton from "./follow_butt";
import ManagerButton from "./manager_menu";
import Supporta from "./supporta";
import { useEffect } from "react";
import axios from "axios";
interface CompInt {
  livello: number;
  comp: JSX.Element;
  project: proj;
  collaboratori: user[];
}

const Comp: React.FC<CompInt> = ({ comp, livello, project, collaboratori }) => {
  history.pushState({ page: "comp" }, "", "/progetto");
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
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: 25 }}>
                {project.name}
              </h5>
              <div
                className="news-text"
                style={{ fontSize: 13, textAlign: "right" }}
              >
                {project.opensource ? "Open Source" : "Closed source"}
              </div>
              <p className="news-text" style={{ fontSize: 20 }}>
                {project.description}
              </p>
              <div
                className={
                  project.images.length === 0 ? "" : "image-scroll-container"
                }
                style={{ paddingTop: 15 }}
              >
                {project.images.map((x) => (
                  <img
                    src={baseUrlImg + x}
                    className="card-img-top k"
                    height="250px"
                    alt="..."
                    key={project.images.indexOf(x)}
                  />
                ))}
              </div>
              <p className="news-text" style={{ paddingTop: 10 }}>
                Data di inizio progetto:{" "}
                {new Date(project.start_date).toLocaleDateString("it-IT")}
              </p>
              {new Date(project.end_date) < new Date(project.start_date) ? (
                <></>
              ) : (
                <p className="news-text" style={{ paddingTop: 10 }}>
                  Data di fine progetto:{" "}
                  {new Date(project.end_date).toLocaleDateString("it-IT")}
                </p>
              )}

              <p
                className="news-text"
                onClick={() =>
                  show_profile(
                    project.user._id,
                    <MyComponent parametroNumero={project._id} comp={comp} />
                  )
                }
              >
                Creato da: @{project.user.username}
              </p>
              {!Cookies.get("authToken") ? (
                <>
                  Per supportare, collaborare e interagire con un progetto
                  accedi o registrati
                </>
              ) : (
                <>
                  {collaboratori?.length != 0 ? (
                    <div className="list-group ">
                      <p>Lista collaboratori:</p>
                      {collaboratori?.map((item) => (
                        <button
                          type="button"
                          className="list-group-item list-group-item-action "
                          aria-current="true"
                          style={{ fontSize: 20 }}
                          key={item._id}
                        >
                          {item.name} {item.surname}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="ls-bt" style={{ marginTop: 20 }}>
                    <div className="d-grid gap-3 ">
                      {livello < 1 ? ( //solo per utenti normali non collaboratori o manager
                        <>
                          <a
                            className="btn bg-color-mod white btn-mod-2 d-flex justify-content-center"
                            href="#"
                            role="button"
                            onClick={() =>
                              root.render(
                                <Supporta
                                  proj={project}
                                  comp={
                                    <Comp
                                      comp={comp}
                                      livello={livello}
                                      project={project}
                                      collaboratori={collaboratori}
                                    />
                                  }
                                />
                              )
                            }
                          >
                            <b>Supporta</b>
                          </a>
                          <a
                            className="btn bg-color-mod white btn-mod-2 d-flex justify-content-center"
                            href="#"
                            role="button"
                          >
                            <b>Collabora</b>
                          </a>
                          <FollowButton str={project._id}></FollowButton>
                        </>
                      ) : (
                        <></>
                      )}
                      {livello > 0 ? (
                        <>
                          <a
                            className="btn bg-color-mod white btn-mod-2 d-flex justify-content-center"
                            href="#"
                            role="button"
                            onClick={() =>
                              root.render(
                                <Crea_news
                                  inputString={project._id}
                                  comp={
                                    <MyComponent
                                      parametroNumero={project._id}
                                      comp={comp}
                                    />
                                  }
                                />
                              )
                            }
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
                        </>
                      ) : (
                        <></>
                      )}
                      {livello === 2 ? (
                        <ManagerButton proj={project}></ManagerButton>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Comp;
