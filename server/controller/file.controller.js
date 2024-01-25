const uploadFile = require("../middleware/uploadMiddleware");
const fs = require("fs");

//app.post("/upload/single", uploadStorage.single("file"), (req, res) => {    return res.send("Single file")})
const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      message:
        "Uploaded the file successfully: <br>" +
        req.file.originalname +
        " <br> as <br>" +
        req.file.filename,
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  var baseUrl = "http://" + req.headers.host + "/files/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    fileInfos.reverse();
    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const getListtoViewFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  //var baseUrl ="http://"+ req.headers.host+"/viewfile/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        //          url: baseUrl + file,
        url: file,
      });
    });
    res.status(200).send(fileInfos);
  });
};

const view = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.sendFile(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
  getListtoViewFiles,
  view,
};
