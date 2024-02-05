import React, { ReactNode } from "react";
import { root } from "../main";

type MessageProps = {
  comp: JSX.Element;
};

function Message({ comp }: MessageProps) {
  history.pushState({ page: "message" }, "", "/message");
  let l = [];

  return (
    <>
      <button
        type="button"
        className="btn-close p-10"
        aria-label="Close"
        onClick={() => {
          history.pushState({ page: "home" }, "", "/");
          root.render(comp);
        }}
      ></button>
      <div className="list-group jj">
        <h5 style={{ textAlign: "center" }}>Messaggi: </h5>
        <p style={{ textAlign: "center" }}>
          Ehi! Qui non sembra esserci nessun messaggio
        </p>
      </div>
    </>
  );
}

export default Message;
