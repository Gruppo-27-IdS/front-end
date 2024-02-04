import React from "react";
import { proj } from "./dettagli_proj";
import { baseUrl, root } from "../main";
import Cookies from "js-cookie";
import axios from "axios";
import { utente } from "../logica/funzioni";
export default function Supporta({
  proj,
  comp,
}: {
  proj: proj;
  comp: JSX.Element;
}) {
  const [qt, setQt] = React.useState(0);
  const [pag, setPag] = React.useState("Paypal");
  function controlQt(e: any) {
    setQt(e);
    if (e < 10) {
      document.getElementById("inputQt")?.classList.add("is-invalid");
      document
        .getElementById("validationServerUsernameFeedback")
        ?.classList.add("show");
    } else {
      document.getElementById("inputQt")?.classList.remove("is-invalid");
      document
        .getElementById("validationServerUsernameFeedback")
        ?.classList.remove("show");
    }
  }
  function funzione(str: string) {
    if (str === "pagamento") {
      if (qt >= 10) {
        document.getElementById("pagamento")?.classList.remove("active");
        document.getElementById("conferma")?.classList.add("active");
      } else {
        document.getElementById("inputQt")?.classList.add("is-invalid");
      }
    } else {
      document.getElementById("conferma")?.classList.remove("active");
      document.getElementById("pagamento")?.classList.add("active");
    }
  }
  function supp() {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          baseUrl + "add_support_proj",
          {
            user_id: utente._id,
            project_id: proj._id,
          },
          {
            headers: {
              token: Cookies.get("authToken"),
            },
          }
        );
        console.log(response.data);
        if (
          response.data.message ===
          "The user support a new project Successfully"
        ) {
          const userDataString = localStorage.getItem("user");

          if (userDataString) {
            // Converti la stringa JSON in un oggetto JavaScript
            const userData = JSON.parse(userDataString);
            userData.supported_projects += 1; // Sostituisci 1 con il nuovo valore desiderato

            // Aggiorna i dati utente nel localStorage
            localStorage.setItem("user", JSON.stringify(userData));
          }
        }
        alert("pagamento confermato");
        root.render(comp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }
  return (
    <>
      <button
        type="button"
        className="btn-close p-10"
        aria-label="Close"
        onClick={() => root.render(comp)}
      ></button>
      <div className="jj" style={{ paddingTop: 15 }}>
        <h2 className=" btn bg-color-mod white d-flex justify-content-center">
          <b>Supporta il progetto</b>
        </h2>
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active" id="pagamento">
              <form className="row g-3 " style={{ paddingTop: 15 }}>
                <div className="col-md-6 ">
                  <label htmlFor="inputName" className="form-label">
                    Quantità da donare (minimo 10 euro):
                  </label>
                  <input
                    type="number"
                    className="form-control "
                    id="inputQt"
                    onChange={(e) => controlQt(Number(e.target.value))}
                    required
                  />
                  <div
                    id="validationServerUsernameFeedback"
                    className="invalid-feedback"
                  >
                    La quantità minima è di 10 euro
                  </div>
                </div>

                <div className="col-md-6 ">
                  <label htmlFor="inputUsername" className="form-label">
                    Metodo di pagamento:
                  </label>
                  <select
                    id="inputState"
                    className="form-select"
                    onChange={(e) => setPag(e.target.value)}
                    required
                  >
                    <option value={"Paypal"}>Paypal</option>
                    <option value={"Credit Card"}>Credit Card</option>
                    {/* Add more options as needed */}
                  </select>
                </div>

                <div className="col-12 d-flex justify-content-center">
                  <button
                    className="btn bg-color-mod white "
                    onClick={() => funzione("pagamento")}
                  >
                    Procedi
                  </button>
                </div>
              </form>
            </div>
            <div className="carousel-item" id="conferma">
              <h2 style={{ textAlign: "center" }}>Riepilogo</h2>
              <div className="centro-piccolo">
                <p>importo: {qt} €</p>
                <p>metodo: {pag}</p>
                <p>progetto: {proj.name}</p>
                <p>
                  manager: {proj.user.name} {proj.user.surname}
                </p>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <button
                  className="btn bg-color-mod white "
                  onClick={() => funzione("conferma")}
                  style={{ marginRight: 10 }}
                >
                  Indietro
                </button>
                <button
                  className="btn bg-color-mod white "
                  onClick={() => supp()}
                >
                  Conferma
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
