import Cookies from "js-cookie";
import { show_profile } from "../logica/funzioni";
import { baseUrl, root } from "../main";
import Crea_news from "../pagine/News/crea_news";
import MyComponent, { proj, user } from "./dettagli_proj";
import Manager_button from "./manager_menu";
import FollowButton from "./follow_butt";
import ManagerButton from "./manager_menu";
import Supporta from "./supporta";
import { useEffect } from "react";
import axios from "axios";
const apiUrl = "get_collabs_from_proj";
interface CompInt {
  livello: number;
  comp: JSX.Element;
  project: proj;
  collaboratori: user[];
}

const Comp: React.FC<CompInt> = ({ comp, livello, project, collaboratori }) => {
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
              <p className="news-text">
                Data di creazione:{" "}
                {new Date(project.start_date).toLocaleDateString("it-IT")}
              </p>
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
                  <div className="list-group jj">
                    {collaboratori?.length != 0 ? (
                      <p>Lista collaboratori:</p>
                    ) : (
                      <></>
                    )}

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
                  <div className="ls-bt">
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
                        <p></p>
                      )}
                      {livello === 2 ? (
                        <ManagerButton proj={project}></ManagerButton>
                      ) : (
                        <p></p>
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
