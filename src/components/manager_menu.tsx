import { proj } from "./dettagli_proj";
import { eliminaProgetto } from "../logica/funzioni";

interface ManagerButtonProps {
  proj: proj;
}

function ManagerButton({ proj }: ManagerButtonProps) {
  return (
    <>
      <a
        className="btn bg-color-mod white btn-mod-2 d-flex justify-content-center"
        href="#"
        role="button"
      >
        <b>Modifica Progetto</b>
      </a>

      <a
        className="btn bg-color-mod white btn-mod-2 d-flex justify-content-center"
        href="#"
        role="button"
      >
        <b>Richieste di partecipazione</b>
      </a>

      <a
        className="btn btn-danger white btn-mod-2 d-flex justify-content-center"
        href="#"
        role="button"
        onClick={() => eliminaProgetto(proj._id)}
      >
        <b>Elimina progetto</b>
      </a>
    </>
  );
}
export default ManagerButton;