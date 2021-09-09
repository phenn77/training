const express = require("express");
const router = express.Router();

const memberController = require("../controller/member");

// router.get("/:artistId", artistController.getArtist);

router.post("/create", memberController.createMember);

module.exports = router;