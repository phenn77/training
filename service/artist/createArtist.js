const Artist = require("../../model/entity/artist");
const Member = require("../../model/entity/member");

function create(data) {
  return new Promise((resolve, reject) => {
    Artist.findOne({ name: data.name }, (err, result) => {
      if (result) {
        console.log("Artist already exist. Name: %s", data.name);

        return reject("Artist already exist.");
      }

      const artist = new Artist({
        name: data.name,
        origin: data.origin,
        status: data.status,
        summary: data.summary,
        website: data.website,
      });

      artist.save((err, result) => {
        if (result) {
          resolve(artist);
        }
      });
    });
  });
}

module.exports = { create };
