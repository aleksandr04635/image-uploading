import React, { useState, useEffect } from "react";
//import UploadService from "../services/FileUploadService";
import { upload1, getFiles } from "../services/FileUploadService";

const ImageUpload = () => {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [imageInfos, setImageInfos] = useState([]);

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
    setMessage("");
    console.log("previewImage: ", previewImage);
  };

  const upload = () => {
    setProgress(0);
    upload1(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        console.log("response.data: ", response.data);
        console.log("response.data.message: ", response.data.message);
        return getFiles();
      })
      .then((files) => {
        console.log("new data set: ", files.data);
        setImageInfos(files.data);
      })
      .catch((err) => {
        setProgress(0);
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          setMessage("Could not upload the Image!");
        }
        setCurrentFile(undefined);
      });
  };

  useEffect(() => {
    console.log("run useEffect");
    getFiles().then((response) => {
      console.log("response.data: ", response.data);
      setImageInfos(response.data);
    });
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
            {/* Select an image*/}
            <input type="file" accept="image/*" onChange={selectFile} />
          </label>
        </div>
        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!currentFile}
            onClick={upload}
          >
            Upload
          </button>
        </div>
      </div>

      {currentFile && (
        <div className="progress my-3">
          <div
            className="progress-bar progress-bar-info"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}

      {previewImage && (
        <div>
          <img className="preview" src={previewImage} alt="" />
        </div>
      )}

      {message && (
        <div className="alert alert-secondary mt-3" role="alert">
          <div dangerouslySetInnerHTML={{ __html: message }}></div>
          {/* {message} */}
        </div>
      )}

      <div className="card mt-3">
        {/*process.env.REACT_APP_HOST*/}
        <div className="card-header">List of Images</div>
        <div className="list-group list-group-flush">
          {imageInfos &&
            imageInfos.map((img, index) => {
              const t = process.env.REACT_APP_HOST + "viewfile/" + img.url; //alt API
              return (
                <div className="list-group-item" key={index}>
                  {/*<a href={t} target="_blank" rel="noreferrer"><img src={t} alt={img.name} height="80px" /> </a>  //alt API */}
                  <a href={img.url} target="_blank" rel="noreferrer">
                    <img src={img.url} alt={img.name} />
                  </a>

                  {/*  
                width="200px"
                height="80px"
                <p>
                  <a href={img.url}>{img.name}</a>
                </p>
                <img src={img.url} alt={img.name} height="80px" />
           */}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
