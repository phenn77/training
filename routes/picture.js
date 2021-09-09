const express = require("express");
const router = express.Router();

const pictureController = require("../controller/picture");

router.get("/:parentId", pictureController.getPicture);

router.post("/add", pictureController.addPicture);


module.exports = router;