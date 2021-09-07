const Album = require("../../model/entity/album");

function get(albumId) {
  return new Promise((resolve, reject) => {
    Album.findOne({ _id: albumId }, (err, result) => {
      if (err) {
        console.log("Album Not Found. Album ID: %s", albumId);

        reject("Album not found. Album ID: " + albumId);
      }

      if (result) {
        resolve(result);
      }

      resolve(null);
    });
  });
}

module.exports = { get };
