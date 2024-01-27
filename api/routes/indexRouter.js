const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");
const cloudController = require("../controller/uploadToCloudinaryController.js");
/*
let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);

  app.use(router);
};

module.exports = routes;
*/

router.post("/upload", controller.upload);
router.get("/files", controller.getListFiles);
router.get("/files/:name", controller.download);
router.get("/filestoview", controller.getListtoViewFiles);
router.get("/viewfile/:name", controller.view);
router.post(
  "/upload-to-cloudinary",
  cloudController.uploadFromTinyMCEToCloudinary
);
router.get("/files-from-cloud", cloudController.getListFilesCloud);

module.exports = router;
