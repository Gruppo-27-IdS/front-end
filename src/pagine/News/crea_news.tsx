import React, { useState } from "react";
import { utente } from "../../logica/funzioni";
import Cookies from "js-cookie";
import axios from "axios";
import { root } from "../../main";
const apiUrl = "http://localhost:5000/api/add_news";
interface CreaNewsProps {
  inputString: string;
  comp: JSX.Element;
}

const Crea_news: React.FC<CreaNewsProps> = ({ inputString, comp }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const crea_news = () => {
    async function fetchData() {
      try {
        const response = await axios.post(
          apiUrl,
          {
            description: description,
            title: title,
            publish_date: new Date(),
            project_id: inputString,
            author: utente.username,
          },
          {
            headers: {
              token: Cookies.get("authToken"),
            },
          }
        );
        console.log(response.data);
        root.render(comp);
        // Gestisci la risposta qui se necessario
      } catch (error) {
        console.error("Errore durante la richiesta:", error);
      }
    }
    fetchData();
  };

  return (
    <>
      <button
        type="button"
        className="btn-close p-10"
        aria-label="Close"
        onClick={() => root.render(comp)}
      ></button>
      <form className="row g-3 jj" style={{ paddingTop: 15 }}>
        <label htmlFor="nomeProgetto" className="form-label">
          Titolo
        </label>
        <input
          type="text"
          id="nomeProgetto"
          className="form-control"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="descrizione" className="form-label">
          Descrizione
        </label>
        <textarea
          id="descrizione"
          rows={3}
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="col-12 justify-content-center d-flex">
          <button className="btn bg-color-mod white " onClick={crea_news}>
            Crea news
          </button>{" "}
        </div>
      </form>
    </>
  );
};

export default Crea_news;
