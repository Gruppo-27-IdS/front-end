import Cookies from "js-cookie";
import { show_profile } from "../logica/funzioni";
import { root } from "../main";
import Crea_news from "../pagine/News/crea_news";
import MyComponent, { proj } from "./dettagli_proj";
import Manager_button from "./manager_menu";
import FollowButton from "./follow_butt";

interface CompInt {
  livello: boolean;
  comp: JSX.Element;
  project: proj;
}
let l = ["ciao", "titti", "pluto"];
const Comp: React.FC<CompInt> = ({ comp, livello, project }) => {
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
                    <MyComponent parametroNumero={project._id} comp={comp} />
                  )
                }
              >
                {/*MANCA NOME MANAGER */}
                Creato da: @{project.name}
              </p>
              {!Cookies.get("authToken") ? (
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
                  <div className="ls-bt">
                    <div className="d-grid gap-3 ">
                      {!livello ? (
                        <>
                          <a
                            className="btn bg-color-mod white btn-mod-2 d-flex justify-content-center"
                            href="#"
                            role="button"
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
                      {livello ? (
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
                      {livello ? <Manager_button></Manager_button> : <p></p>}
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
