import axios from "axios";
import { useState, useEffect } from "react";
import { Project, expand_proj, lista_tuoi_progetti } from "../logica/funzioni";
import TopBar from "./top-bar";
const apiUrl = "http://localhost:5000/api/get_all_projects";

function My_proj() {
  const [lista_tuoi_progetti, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Funzione asincrona per ottenere i dati e aggiornare lo stato
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        setProjects(response.data);
      } catch (error: any) {
        console.error(
          "Errore durante il recupero dei progetti:",
          error.message
        );
      }
    };

    // Chiamata alla funzione asincrona
    fetchData();
  }, []);
  return (
    <>
      <div
        className="row row-cols-1 row-cols-md-2 g-4 jj"
        style={{ paddingTop: 5 }}
      >
        {lista_tuoi_progetti.map((item) => (
          <>
            <div className="col" key={item._id}>
              <div
                className="card mb-3 h-100"
                onClick={() => expand_proj(item, <My_proj />)}
              >
                {/*}
                <img
                  src={item.g_proj.length > 0 ? item.g_proj[0] : ""}
                  className="card-img-top"
                  alt=""
                />*/}
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: 25 }}>
                    {item.name}
                  </h5>
                  <p className="news-text" style={{ fontSize: 20 }}>
                    {item.description}
                  </p>
                  <p className="news-text">
                    <small
                      className="text-body-secondary"
                      style={{ fontSize: 15 }}
                    >
                      {item.category}
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
