const createUserService = require("../service/user/createUser");
const getUserService = require("../service/user/getUser");
const approveUserService = require("../service/user/approveUser");
const blockUserService = require("../service/user/blockUser");

const message = require("../lib/message");

createUser = async (req, res) => {
  let data;

  try {
    data = await createUserService.create(req.body);
  } catch (e) {
    return message.error(res, e);
  }

  return message.success(res, data);
};

getUser = async (req, res) => {
  let data;

  try {
    data = await getUserService.get(req.params.userId);
  } catch (e) {
    return message.error(res, e);
  }

  return message.success(res, data);
};

approveUser = async (req, res) => {
  let data;

  try {
    data = await approveUserService.approve(req.params.userId);
  } catch (e) {
    return message.error(res, e);
  }

  return message.success(res, data);
};

blockUser = async (req, res) => {
  let data;
  
  try {
    data = await blockUserService.block(req.params.userId);
  } catch (e) {
    return message.error(res, e);
  }

  return message.success(res, data);
};

module.exports = {
  createUser,
  getUser,
  approveUser,
  blockUser,
};
