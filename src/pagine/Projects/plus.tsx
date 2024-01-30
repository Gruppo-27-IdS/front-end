import { useState } from "react";
import { utente } from "../../logica/funzioni";
import axios from "axios";
import Cookies from "js-cookie";
import { reload } from "../User/login";
const apiUrl = "http://localhost:5000/api/add_project";
function Plus() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [start_date, setStart_date] = useState(new Date());
  const [end_date, setEnd_date] = useState(new Date());
  const [opensource, setOpensource] = useState(false);
  const [manager, setManager] = useState(utente.username);
  const crea_pj = () => {
    async function fetchData() {
      try {
        const response = await axios.post(
          apiUrl,
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
        // Gestisci la risposta qui se necessario
      } catch (error) {
        console.error("Errore durante la richiesta:", error);
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
                <label htmlFor="inputEndDate" className="form-label">
                  Data di fine progetto
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputEndDate"
                  onChange={(e) => setEnd_date(new Date(e.target.value))}
                  required
                />
              </div>
              <div className="col-md-6">
                <div
                  className="form-check form-switch"
                  style={{ paddingTop: 5 }}
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
              <div className="col-md-6">
                <label htmlFor="inputState" className="form-label">
                  Categoria
                </label>
                <select
                  id="inputState"
                  className="form-select"
                  defaultValue={"DEFAULT"}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="DEFAULT" disabled>
                    Seleziona
                  </option>
                  <option>Categoria A</option>
                  <option>Categoria B</option>
                  <option>Categoria C</option>
                </select>
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
