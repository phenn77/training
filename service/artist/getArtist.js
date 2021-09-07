const Artist = require("../../model/entity/artist");

function get(artistId) {
  return new Promise(function (resolve, reject) {
    // Artist.findOne({ _id: artistId }, (err, artist) => {
    //   if (!artist) {
    //     console.log("Artist Not Found. Artist ID: %s", artistId);

    //     reject("Artist not found. Artist ID: " + artistId);
    //   } else {

    //     resolve(artist);
    //   }

    //   resolve(null);
    // });

    Artist.findOne({ _id: artistId })
      .populate("albums")
      .exec(function (err, artist) {
        resolve(artist);
      });
  });
}

module.exports = {
  get,
};
