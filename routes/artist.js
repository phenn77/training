const express = require("express");
const router = express.Router();

const middleware = require('../middleware/middleware');
const requestBody = require('../middleware/artist/createRequest');

const artistController = require("../controller/artist");

router.get("/:artistId", artistController.getArtist);
router.get("", artistController.getAll);

// router.post("/create", artistController.createArtist);
router.post("/create", middleware(requestBody), (req, res) => {
    artistController.createArtist(req, res);
});

// router.post("/approve/:userId", userController.approveUser);
// router.post("/block/:userId", userController.blockUser);

module.exports = router;
