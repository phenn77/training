const createAlbumService = require("../service/album/createAlbum");
const getAlbumService = require("../service/album/getAlbum");

const message = require("../lib/message");

createAlbum = async (req, res) => {
  let data;

  try {
    data = await createAlbumService.create(req.body);
  } catch (e) {
    return message.error(res, e);
  }

  return message.success(res, data);
};

getAlbum = async (req, res) => {
  let data;

  try {
    data = await getAlbumService.get(req.params.albumId);
  } catch (e) {
    return message.error(res, e);
  }

  return message.success(res, data);
};

module.exports = { createAlbum, getAlbum };
