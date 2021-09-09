const Member = require("../../model/entity/member");

const getArtistService = require("../artist/getArtist");

function create(requestBody) {
  return new Promise(async (resolve, reject) => {
    let artistData;
    try {
      artistData = await getArtistService.get(requestBody.artistId);
    } catch (err) {
      return reject(err);
    }

    if (requestBody.members.length === 0) {
      return reject("No member need to be added");
    }

    const memberName = requestBody.members.map((member) => new RegExp(`^${member.name}$`, "i"));

    Member.find()
      .and([{ artist: artistData.id }, { name: { $in: memberName } }])
      .exec((error, result) => {
        if (result.length > 0) {
          result.forEach((x) => console.log("Name already exist: %s", x.name));

          return reject("Name already exist.");
        }

        const members = [];
        requestBody.members.forEach((member) => {
          const memberData = new Member({
            name: member.name,
            birthday: member.birthday,
            status: member.status,
            summary: member.summary,
            position: member.position,
            artist: artistData.id,
          });

          members.push(memberData);
        });

        Member.insertMany(members, (err, resp) => {
          if (err) {
            reject(err.message);
          }

          if (resp) {
            resolve(resp);
          }

          resolve(null);
        });
      });
  });
}

module.exports = { create };
