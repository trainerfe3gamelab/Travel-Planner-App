import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // ini url API lokal default
});

export default api;
