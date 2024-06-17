import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8597/api", // ini url API lokal default
});

export default api;
