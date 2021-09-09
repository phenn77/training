const addPictureService = require("../service/picture/addPicture");
const getPictureService = require("../service/picture/getPicture");

const message = require("../lib/message");

addPicture = async (req, res) => {
  let data;

  try {
    data = await addPictureService.add(req.body);
  } catch (err) {
    return message.error(res, err);
  }

  return message.success(res, data);
};

getPicture = async (req, res) => {
  let data;

  try {
    data = await getPictureService.get(req.params.id);
  } catch (err) {
    return message.error(res, err);
  }

  return message.success(res, data);
};

module.exports = { addPicture, getPicture };
