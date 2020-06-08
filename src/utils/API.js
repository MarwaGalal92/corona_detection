import axios from "axios";

export default axios.create({
  //json-server --watch db.json --port 3005
  baseURL: "http://localhost:3005/data",
  headers: {
    "Content-Type": "application/json",
  },
});
