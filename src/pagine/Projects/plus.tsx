import { useState } from "react";
import { utente } from "../../logica/funzioni";
import axios from "axios";
import Cookies from "js-cookie";
import { reload } from "../User/login";
import { baseUrl, root } from "../../main";
import MyComponent from "../../components/dettagli_proj";
import My_proj from "./my_proj";
import { closeC } from "../User/create_profile";
const apiUrl = "add_project";
function Plus() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [start_date, setStart_date] = useState(new Date());
  const [end_date, setEnd_date] = useState(new Date(""));
  const [opensource, setOpensource] = useState(false);
  const [manager, setManager] = useState(utente.username);
  const crea_pj = () => {
    async function fetchData() {
      if (end_date != new Date("")) {
        if (end_date < start_date) {
          document.getElementById("mess-text")!.innerHTML =
            "La data di fine progetto non può essere precedente a quella di inizio";

          document.getElementById("toast")!.classList.add("show");
        }
      }
      try {
        const response = await axios.post(
          baseUrl + apiUrl,
          {
            description: description,
            name: name,
            category: category,
            start_date: start_date,
            end_date: end_date,
            opensource: opensource,
            manager: manager,
          },
          {
            headers: {
              token: Cookies.get("authToken"),
            },
          }
        );
        console.log(response.data);
        if (response.data.message === "Project added successfully") {
          root.render(<My_proj />);
        } else {
          document.getElementById("mess-text")!.innerHTML =
            "Errore durante la creazione del progetto";

          document.getElementById("toast")!.classList.add("show");
        }
        // Gestisci la risposta qui se necessario
      } catch (error: any) {
        document.getElementById("mess-text")!.innerHTML = error.data.messagge;

        document.getElementById("toast")!.classList.add("show");
      }
    }
    fetchData();
  };

  return (
    <>
      {reload() ? (
        <div className="jj" style={{ paddingTop: 30 }}>
          <div>
            Per visualizzare la pagina devi prima accedere o registrati presso
            la pagina profilo!
          </div>
        </div>
      ) : (
        <>
          <div
            className="toast position-relative top-0 start-50 translate-middle-x text-bg-danger"
            aria-live="assertive"
            aria-atomic="true"
            id="toast"
          >
            <div className="d-flex">
              <div className="toast-body" id="mess-text">
                Errore
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={closeC}
              ></button>
            </div>
          </div>
          <div className="jj" style={{ paddingTop: 15 }}>
            <form className="row g-3" onSubmit={crea_pj}>
              <div className="col-12">
                <label htmlFor="nomeProgetto" className="form-label">
                  Nome del Progetto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nomeProgetto"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="descrizione" className="form-label">
                  Descrizione
                </label>
                <textarea
                  className="form-control"
                  rows={3}
                  id="descrizione"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputStartDate" className="form-label">
                  Data di inizio progetto
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputStartDate"
                  onChange={(e) => setStart_date(new Date(e.target.value))}
                  required
                />
              </div>
              <div className="col-12">
                <label htmlFor="inputEndDate" className="form-label">
                  Data di fine progetto (non obbligatoria)
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputEndDate"
                  onChange={(e) => setEnd_date(new Date(e.target.value))}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputState" className="form-label">
                  Categoria
                </label>
                <input
                  id="inputState"
                  className="form-control"
                  type="text"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6" style={{ paddingLeft: 20 }}>
                <div
                  className="form-check form-switch"
                  style={{ paddingTop: 30 }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                    onChange={(e) => setOpensource(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckChecked"
                  >
                    Opensource
                  </label>
                </div>
              </div>

              <div className="col-12 justify-content-center d-flex">
                <button className="btn bg-color-mod white " type="submit">
                  Crea
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      ;
    </>
  );
}
export default Plus;
