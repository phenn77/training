const express = require("express");
const router = express.Router();

const albumController = require("../controller/album");

router.get("/:albumId", albumController.getAlbum);
router.get("", albumController.getAll);

router.post("/create", albumController.createAlbum);

// router.post("/approve/:userId", userController.approveUser);
// router.post("/block/:userId", userController.blockUser);

module.exports = router;
