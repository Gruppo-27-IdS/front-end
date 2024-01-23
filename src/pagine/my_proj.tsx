import { expand_proj, lista_tuoi_progetti } from "../logica/funzioni";
import TopBar from "./top-bar";

function My_proj() {
  return (
    <>
      <div
        className="row row-cols-1 row-cols-md-2 g-4 jj"
        style={{ paddingTop: 5 }}
      >
        {lista_tuoi_progetti.map((item) => (
          <>
            <div className="col" key={item.u_project}>
              <div
                className="card mb-3 h-100"
                onClick={() => expand_proj(item.u_project, <My_proj />)}
              >
                <img
                  src={item.g_proj.length > 0 ? item.g_proj[0] : ""}
                  className="card-img-top"
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: 25 }}>
                    {item.proj_title}
                  </h5>
                  <p className="news-text" style={{ fontSize: 20 }}>
                    {item.proj_description}
                  </p>
                  <p className="news-text">
                    <small
                      className="text-body-secondary"
                      style={{ fontSize: 15 }}
                    >
                      {item.proj_data}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
export default My_proj;
