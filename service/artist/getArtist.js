const Artist = require("../../model/entity/artist");

function get(artistId) {
  return new Promise(async (resolve, reject) => {
    Artist.findOne({ _id: artistId }, { __v: 0 })
      .populate({ path: "members", select: "name" })
      .populate({
        path: "albums",
        select: "name releaseYear",
        options: { sort: { releaseYear: -1 } },
      })
      .populate({ path: "singles", select: "name" })
      .populate({
        path: "pictures",
        select: "fileDirectory",
        options: { sort: { createdAt: -1 } },
      })
      .exec((err, artist) => {
        if (!artist) {
          console.log("Artist not found. Artist ID: %s", artistId);

          reject("Artist not found. Artist ID: " + artistId);
        }

        if (artist) {
          var response = artist.toObject();

          delete response._id;
          delete response.__v;

          if (response.albums.length > 0) {
            response.albums.forEach((album) => {
              delete album._id;
            });
          }

          if (response.members.length > 0) {
            response.members.forEach((member) => {
              delete member._id;
            });
          }

          if (response.singles.length > 0) {
            response.singles.forEach((single) => {
              delete single._id;
            });
          }

          if (response.pictures.length > 0) {
            response.pictures = {
              fileDirectory: response.pictures[0].fileDirectory,
            };
          } else {
            response.pictures = {};
          }

          resolve(response);
        }

        resolve(null);
      });
  });
}

module.exports = {
  get,
};
