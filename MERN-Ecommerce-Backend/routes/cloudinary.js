const express = require("express");

const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//Controllers
const { upload, remove } = require("../controllers/cloudinary");

//route
router.post("/image/upload", authCheck, adminCheck, upload);
router.post("/image/remove", remove);

module.exports = router;
