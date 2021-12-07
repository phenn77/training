const express = require("express");
const router = express.Router();

const memberController = require("../controller/member");

router.get("/:memberId", memberController.getMember);

router.post("/create", memberController.createMember);

module.exports = router;