import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { init } from "./login";
import { root } from "../../main";
import Profile from "./profile";

const apiUrl = "http://localhost:5000/api/add_user";
function Create_profile() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const create_prof = () => {
    const fetchData = async () => {
      try {
        const response = await axios.post(apiUrl, {
          username: username,
          name: name,
          surname: surname,
          age: age,
          phone: phone,
          email: email,
          password: password,
        });
        if (response.data.message === "User Added Successfully") {
          try {
            const response = await axios.post(
              "http://localhost:5000/api/login_user",
              {
                username: username,
                password: password,
              }
            );
            console.log(response.data);
            if (response.data.message === "Login riuscito") {
              Cookies.set("authToken", response.data.token);
              init(response.data.user);
            }
          } catch (error: any) {
            console.error("Errore durante il log-in:", error.message);
          }
          root.render(<Profile />);
        }
      } catch (error: any) {
        console.error("Errore durante la registrazione:", error.message);
      }
    };
    fetchData();
  };
  return (
    <>
      <form className="row g-3 jj">
        <div className="col-md-6 ">
          <label htmlFor="inputEmail4" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Cognome
          </label>
          <input
            type="text"
            className="form-control"
            id="inputSurname"
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className="col-md-6 ">
          <label htmlFor="inputEmail4" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Telefono
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPhone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            Età
          </label>
          <input
            type="number"
            className="form-control"
            id="inputAge"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="col-12 d-flex justify-content-center">
          <button
            className="btn bg-color-mod white "
            onClick={() => create_prof()}
          >
            Registrati
          </button>
        </div>
      </form>
    </>
  );
}
export default Create_profile;
