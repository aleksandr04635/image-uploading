const util = require("util");
const multer = require("multer");

//const { v4: uuidv4 } = require('uuid')
const maxSize = 2 * 1024 * 1024;

let storaged = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
    //  cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    //console.log(file.originalname);
    const ext = file.originalname.split('.').pop();
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1E6)+"."+ext);

    //cb(null, Date.now() + "-" + uuidv4());
    //cb(null,  file.originalname);
    //cb(null, Date.now() + "-" + file.originalname)  //with date
  },
});

let uploadFile = multer({
  storage: storaged,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
