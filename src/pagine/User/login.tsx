import axios from "axios";
import { useState, useEffect } from "react";
import { utente } from "../../logica/funzioni";
import Profile from "./profile";
import Cookies from "js-cookie";
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
function init(e: any) {
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
}

//componente Login
function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const titti = () => {
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
          "Errore durante il recupero dei progetti:",
          error.message
        );
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
            onClick={() => titti()}
          >
            <b>Login</b>
          </a>
        </div>
      </div>
    </>
  );
}
export default Login;
