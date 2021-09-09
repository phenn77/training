const Album = require("../../model/entity/album");

function get(albumId) {
  return new Promise((resolve, reject) => {
    Album.findOne({ _id: albumId }, { __v: 0 })
      .populate({ path: "artist", select: "name" })
      .exec((error, album) => {
        if (!album) {
          console.log("Album not found. Album ID: %s", albumId);

          reject("Album not found.");
        }

        if (album) {
          var data = album.toObject();

          delete data._id;

          delete data.artist.albums;
          delete data.artist.__v;
          delete data.artist._id;

          resolve(data);
        }

        resolve(null);
      });
  });
}

module.exports = { get };
