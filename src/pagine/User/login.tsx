import axios from "axios";
import { useState, useEffect } from "react";
import { utente } from "../../logica/funzioni";
import Profile from "./profile";
import Cookies from "js-cookie";
import { root } from "../../main";
import Create_profile from "./create_profile";
import { proj } from "../../components/dettagli_proj";
const apiUrl = "http://localhost:5000/api/login_user";

//funzione che controlla se l'utente è loggato e in chiama init per userData
export function reload() {
  if (utente._id != "") return false;
  const userData = localStorage.getItem("user");
  if (userData) {
    init(JSON.parse(userData));
    console.log(utente);
    return false;
  }
  return true;
}

//funzione logOut
export const logout = () => {
  utente._id = "";
  localStorage.removeItem("user");
  Cookies.remove("authToken");
};

//inizializza i dati dell'utente
export function init(e: any) {
  localStorage.setItem("user", JSON.stringify(e));

  utente._id = e._id;
  utente.__v = e.__v;
  utente.age = e.age;
  utente.created = e.created;
  utente.email = e.email;
  utente.name = e.name;
  utente.password = e.password;
  utente.phone = e.phone;
  utente.surname = e.surname;
  utente.username = e.username;
  utente.supported_projects = e.supported_projects;
}

//componente Login
function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const log_in = () => {
    const fetchData = async () => {
      try {
        const response = await axios.post(apiUrl, {
          username: username,
          password: password,
        });
        console.log(response.data);
        if (response.data.message === "Login riuscito") {
          Cookies.set("authToken", response.data.token);
          init(response.data.user);
          setIsLoggedIn(true);
        }
      } catch (error: any) {
        console.error(
          "Errore durante il log-in:",
          error.message,
          error.response.data.message
        );
        alert(error.response.data.message);
      }
    };
    fetchData();
  };

  useEffect(() => {
    reload();
    const sessionTimeout = setTimeout(() => {
      logout();
    }, 24 * 60 * 60 * 1000);
    return () => clearTimeout(sessionTimeout);
  }, []);

  if (isLoggedIn) {
    // Se l'utente è loggato, mostra la componente Profile
    return <Profile></Profile>;
  }
  return (
    <>
      <div className="jj" style={{ paddingTop: 30 }}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Username
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div id="passwordHelpBlock" className="form-text">
            Your password must be 7-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </div>
        </div>
        <div className="ls-bt">
          <a
            className="btn bg-color-mod white btn-mod-2 d-flex justify-content-center"
            href="#"
            role="button"
            onClick={() => log_in()}
          >
            <b>Login</b>
          </a>
          <p style={{ textAlign: "center" }}>o</p>
          <a
            className="btn bg-color-mod white btn-mod-2 d-flex justify-content-center"
            href="#"
            role="button"
            onClick={() => {
              root.render(<Create_profile />);
            }}
          >
            <b>Registrati</b>
          </a>
        </div>
      </div>
    </>
  );
}
export default Login;