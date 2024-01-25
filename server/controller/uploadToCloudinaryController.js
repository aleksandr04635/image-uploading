// next function is based on https://codeburst.io/image-upload-with-cloudinary-part-2-next-react-node-js-198108f672e5
require("dotenv").config();
const path = require("path");
const Image = require("../models/Image.js");
const multer = require("multer");
const DatauriParser = require("datauri/parser");

const parser = new DatauriParser();

const formatBufferTo64 = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
const storage = multer.memoryStorage();
const uploadToMemory = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Not supported file type!"), false);
    }
  },
});

const cloudinaryUpload = (file, originalname) =>
  cloudinary.uploader.upload(file, {
    public_id:
      "CloudinaryDemo/" + Date.now() + "-" + Math.round(Math.random() * 1e6),
  });

const uploadFromTinyMCEToCloudinary = [
  uploadToMemory.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("Image is not presented!");
      }
      if (req.file.size > 1000000) {
        throw new Error("File size cannot be larger than 1MB!");
      }
      console.log("req.file:");
      console.log(req.file);
      //console.log(req.file.size);
      //console.log(req.file.originalname);
      // console.log("file before:");
      // console.log(ALLOWED_FORMATS );
      const file64 = formatBufferTo64(req.file);
      // console.log("file64 :");
      // console.log(file64.content);
      const uploadResult = await cloudinaryUpload(
        file64.content,
        req.file.originalname
      );
      console.log("uploadResult: ", uploadResult);
      //res.send('Done');
      // return res.json({cloudinaryId: uploadResult.public_id, url: uploadResult.secure_url});
      Image.create({
        name: req.file.originalname,
        url: uploadResult.url,
      });
      /*       const userDoc = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      }); */
      // res.cookie("token", token).json(userDoc);
      //  return res.status(200).send({ location: uploadResult.url });
      res.status(200).send({
        message:
          "Uploaded the file successfully: <br>" +
          req.file.originalname +
          " <br> as <br>" +
          //req.file.filename,
          uploadResult.url,
      });
    } catch (e) {
      console.log("err:", e);
      return res.status(422).send({ message: e.message });
    }
  },
];

const getListFilesCloud = async (req, res) => {
  /*   const directoryPath = __basedir + "/resources/static/assets/uploads/";

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
  }); */
  res.json(await Image.find().sort({ createdAt: -1 }));
};

module.exports = {
  uploadFromTinyMCEToCloudinary,
  getListFilesCloud,
};
