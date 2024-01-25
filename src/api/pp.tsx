import { useEffect, useState } from "react";
import axios from "axios";
//import User from "./../../../back-end/models/users.js";
import User from "./../../../back-end/models/users";
//console.log(User);

const BaseURL = "localhost:5000";

const init = axios.create({ baseURL: "localhost:5000" });

export const getTasks = () => {
  return init.get("/api/get_all_projects");
};
export async function getUser() {
  try {
    const response = await axios.get("localhost:5000/get_all_projects");
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
