const express = require("express");
const router = express.Router();

const artistController = require("../controller/artist");

router.get("/:artistId", artistController.getArtist);

router.post("/create", artistController.createArtist);
// router.post("/approve/:userId", userController.approveUser);
// router.post("/block/:userId", userController.blockUser);

module.exports = router;