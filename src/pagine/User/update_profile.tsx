import { useState } from "react";
import { root } from "../../main";
import Profile from "./profile";
import { utente } from "../../logica/funzioni";
import axios from "axios";
const apiUrl = "http://localhost:5000/api/update_user";

function Update_profile() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(utente.username);
  const [email, setEmail] = useState(utente.email);
  const [age, setAge] = useState(utente.age.toString());
  const [phone, setPhone] = useState(utente.phone);
  const [name, setName] = useState(utente.name);
  const [surname, setSurname] = useState(utente.surname);
  const update_prof = () => {
    const fetchData = async () => {
      try {
        let pswNuova = password;
        if (password === "") {
          pswNuova = utente.password;
        }
        const response = await axios.post(apiUrl, {
          id: utente._id,
          username: username,
          name: name,
          surname: surname,
          age: age,
          phone: phone,
          email: email,
          password: pswNuova,
        });

        if (response.data.message === "User Updated Successfully") {
          root.render(<Profile />);
        }
      } catch (error: any) {
        console.error("Errore durante la modifica:", error.message);
      }
    };
    fetchData();
  };
  return (
    <>
      <button
        type="button"
        className="btn-close p-10"
        aria-label="Close"
        onClick={() => root.render(<Profile />)}
      ></button>
      <div className="jj">
        <form className="row g-3 jj">
          <div className="col-md-6 ">
            <label htmlFor="inputName" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              value={utente.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputSurname" className="form-label">
              Cognome
            </label>
            <input
              type="text"
              className="form-control"
              id="inputSurname"
              value={utente.surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="col-md-6 ">
            <label htmlFor="inputUsername" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="inputUsername"
              value={utente.username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPhone" className="form-label">
              Telefono
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPhone"
              value={utente.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword" className="form-label">
              Nuova password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              value={utente.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="inputAge" className="form-label">
              Età
            </label>
            <input
              type="number"
              className="form-control"
              id="inputAge"
              value={utente.age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="col-12 d-flex justify-content-center">
            <button
              className="btn bg-color-mod white "
              onClick={() => update_prof()}
            >
              Registrati
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Update_profile;
