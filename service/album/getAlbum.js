const Album = require("../../model/entity/album");

function get(albumId) {
  return new Promise((resolve, reject) => {
    Album.findOne({ _id: albumId }, { __v: 0 })
      .populate({ path: "artist", select: "name" })
      .populate({ path: "pictures", select: "fileDirectory" })
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

          if (data.pictures.length > 0) {
            data.pictures = {
              fileDirectory: data.pictures[0].fileDirectory,
            };
          } else {
            data.pictures = {};
          }

          resolve(data);
        }

        resolve(null);
      });
  });
}

module.exports = { get };
