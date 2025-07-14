import axios from "axios";

export const Api = axios.create({
  baseURL: "http://localhost:3388",
  headers: {
    "Content-Type": "application/json",
  },
});
