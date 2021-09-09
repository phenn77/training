const createArtistService = require("../service/artist/createArtist");
const getArtistService = require("../service/artist/getArtist");
const getAllService = require("../service/artist/getAll");

const message = require("../lib/message");

createArtist = async (req, res) => {
  let data;

  try {
    data = await createArtistService.create(req.body);
  } catch (e) {
    return message.error(res, e);
  }

  return message.success(res, data);
};

getArtist = async (req, res) => {
  let data;
  try {
    data = await getArtistService.get(req.params.artistId);
  } catch (e) {
    return message.error(res, e);
  }

  return message.success(res, data);
};

getAll = async (req, res) => {
  let data;

  try {
    data = await getAllService.getAll();
  } catch (e) {
    return message.error(res, e);
  }

  return message.success(res, data);
};

module.exports = {
  createArtist,
  getArtist,
  getAll
};
