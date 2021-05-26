const express = require("express");
const router = express.Router();

const userController = require("../controller/user");

router.get("/:userId", userController.getUser);

router.post("/create", userController.createUser);
router.post("/approve/:userId", userController.approveUser);

module.exports = router;
