import React, { useEffect, useState } from "react";
import axios from "axios";
import Project from "./../../back-end/models/projects";
import My_proj from "./pagine/Projects/my_proj";
import Home from "./pagine/News/home";
import Login from "./pagine/User/login";
import Titti from "./components/supporta";
const apiUrl = "http://localhost:5000/api/get_all_projects";

function App() {
  return <Home></Home>;
}

export default App;
