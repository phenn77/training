const createArtistService = require("../service/artist/createArtist");

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

module.exports = {
    createArtist,
};
