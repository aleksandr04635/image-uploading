import http from "../http-common";

const upload1 = (file, onUploadProgress) => {
  let formData = new FormData();
  formData.append("file", file);
  console.log("sent formData:", formData);
  console.log("sent file:", file);
  // return http.post("/upload", formData, {//to FS
  return http.post("/upload-to-cloudinary", formData, {
    //to cloud
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = () => {
  //return http.get("/files"); //from FS
  return http.get("/files-from-cloud"); //from cloud
  //return http.get("/filestoview");   //alt API
};

//export default{
export { upload1, getFiles };

//export { UserContext, UserProvider }
//^  import { UserContext } from "./context/UserContext"
//export default App
//^import App from './App';
/* ?
module.exports = {
  upload,
  getListFiles,
  download,
  view
};*/
