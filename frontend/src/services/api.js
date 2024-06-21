import axios from "axios";

const api = axios.create({
  baseURL: "https://api-msib-6-travel-planner-01.educalab.id/", // ini url API lokal default
});

export default api;
