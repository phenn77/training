const Artist = require("../../model/entity/artist");
const Member = require("../../model/entity/member");

async function create(requestBody) {
  const retrieveArtistData = new Promise((resolve) => {
    Artist.findOne({ _id: requestBody.artistId }, (err, artist) => {
      if (err) {
        resolve(null);
      }

      if (artist) {
        resolve(artist);
      }

      resolve(null);
    });
  });

  const artistData = await Promise.resolve(retrieveArtistData);

  return new Promise((resolve, reject) => {
    if (requestBody.members.length === 0) {
      return reject("No member need to be added");
    }

    if (artistData === null) {
      return reject("Artist not found.");
    }

    const memberName = requestBody.members.map(
      (member) => new RegExp(`^${member.name}$`, "i")
    );

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
