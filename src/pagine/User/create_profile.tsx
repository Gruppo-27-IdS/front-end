import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { init } from "./login";
import { baseUrl, root } from "../../main";
import Profile from "./profile";

export function closeC() {
  document.getElementById("toast")!.classList.remove("show");
}
const apiUrl = "add_user";
function Create_profile() {
  history.pushState({ page: "createProfile" }, "", "/createProfile");
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
        const response = await axios.post(baseUrl + apiUrl, {
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
            const response = await axios.post(baseUrl + "login_user", {
              username: username,
              password: password,
            });
            console.log(response.data);
            if (response.data.message === "Login riuscito") {
              Cookies.set("authToken", response.data.token);
              init(response.data.user);
            }
          } catch (error: any) {
            console.error("Errore durante il log-in:", error.message);
          }
          root.render(<Profile />);
        } else {
          document.getElementById("mess-text")!.innerHTML =
            "Errore durante la registrazione";
          document.getElementById("toast")!.classList.add("show");
        }
      } catch (error: any) {
        if (error.response.data.message === "password is not valid")
          document.getElementById("mess-text")!.innerHTML =
            error.response.data.message;
        else if (error.response.data.message.includes("email"))
          document.getElementById("mess-text")!.innerHTML = "Email già in uso";
        else if (error.response.data.message.includes("username")) {
          document.getElementById("mess-text")!.innerHTML =
            "Username già in uso";
        } else
          document.getElementById("mess-text")!.innerHTML =
            "Errore durante la registrazione";
        console.error("Errore durante la registrazione:", error);
        document.getElementById("toast")!.classList.add("show");
      }
    };
    fetchData();
  };
  return (
    <>
      <div
        className="toast position-relative top-0 start-50 translate-middle-x text-bg-danger"
        aria-live="assertive"
        aria-atomic="true"
        id="toast"
      >
        <div className="d-flex">
          <div className="toast-body" id="mess-text">
            Hello, world! This is a toast message.
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
      <button
        type="button"
        className="btn-close p-10"
        aria-label="Close"
        onClick={() => root.render(<Profile />)}
      ></button>
      <form className="row g-3 jj">
        <div className="col-md-6 ">
          <label htmlFor="inputName" className="form-label">
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
          <label htmlFor="inputSurname" className="form-label">
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
          <label htmlFor="inputUsername" className="form-label">
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
          <label htmlFor="inputPhone" className="form-label">
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
          <label htmlFor="inputPassword" className="form-label">
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
          <label htmlFor="inputEmail" className="form-label">
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
          <label htmlFor="inputAge" className="form-label">
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
