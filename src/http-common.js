import axios from "axios";

export default axios.create({
  baseURL: `${process.env.REACT_APP_BACK_URL}/api`,
  //baseURL: "http://localhost:8080", //for npm start and deployment from port 8081
  //baseURL: "http://localhost:7080", //for server on port 7080
  //baseURL: "", //for build and addition to express-upload-download
  headers: {
    "Content-type": "application/json",
  },
});
