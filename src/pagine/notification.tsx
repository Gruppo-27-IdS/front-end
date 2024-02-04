import { root } from "../main";

function Notif({ comp }: { comp: JSX.Element }) {
  let l = ["Creazione dell'account completata"];

  return (
    <>
      <button
        type="button"
        className="btn-close p-10"
        aria-label="Close"
        onClick={() => root.render(comp)}
      ></button>
      <div className="list-group jj">
        <h5 style={{ textAlign: "center" }}>Notifiche: </h5>
        {l.map((item) => (
          <button
            type="button"
            className="list-group-item list-group-item-action "
            aria-current="true"
            style={{ fontSize: 18 }}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}
export default Notif;
