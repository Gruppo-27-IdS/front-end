import {
  expand_proj,
  lista_progetti_esplora,
  Project,
} from "../logica/funzioni";
import TopBar from "./top-bar";

function Exp() {
  return (
    <>
      <div id="explore">
        <nav className="navbar bg-body-tertiary" style={{ height: 70 }}>
          <div className="container-fluid">
            <form className="d-flex w-100" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn bg-color-mod white"
                style={{ marginRight: 5 }}
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </button>
              <button className="btn bg-color-mod white" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-filter-right"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5" />
                </svg>
              </button>
            </form>
          </div>
        </nav>
        <div className="row row-cols-1 row-cols-md-2 g-4 jj">
          {lista_progetti_esplora.map((item) => (
            <div className="col" key={item.u_project}>
              <div
                className="card mb-3 h-100"
                onClick={() => expand_proj(item.u_project, <Exp />)}
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
                  <p
                    className="news-text text-truncate"
                    style={{ fontSize: 20 }}
                  >
                    {item.proj_description}
                  </p>
                  <p className="news-text sticky-bottom">
                    <small
                      className="text-body-secondary "
                      style={{ fontSize: 15 }}
                    >
                      {item.proj_data}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Exp;
