const createMemberService = require("../service/member/createMember");
// const getArtistService = require("../service/artist/getArtist");

const message = require("../lib/message");

const createMember = async (req, res) => {
  let data;

  try {
    data = await createMemberService.create(req.body);
  } catch (e) {
    return message.error(res, e);
  }

  return message.success(res, data);
};

// getArtist = async (req, res) => {
//   let data;
//   try {
//     data = await getArtistService.get(req.params.artistId);
//   } catch (e) {
//     return message.error(res, e);
//   }

//   return message.success(res, data);
// };

module.exports = {
    createMember,
//   getArtist,
};
