const Album = require("../../model/entity/album");

const getArtistService = require("../artist/getArtist");

function create(data) {
  return new Promise(async (resolve, reject) => {
    let artistData;
    try {
      artistData = await getArtistService.get(data.artistId);
    } catch (err) {
      return reject(err);
    }

    Album.findOne({
      $and: [
        { name: { $regex: new RegExp(`^${data.name}$`, "i") } },
        { artist: artistData.id },
      ],
    })
      .populate("artist")
      .exec((err, result) => {
        if (result) {
          console.log(
            "Album already exist. Name: %s by %s",
            result.name,
            result.artist.name
          );

          return reject("Album already exist.");
        }

        const album = new Album({
          name: data.name,
          releaseYear: data.releaseYear,
          artist: artistData.id,
          tracklist: data.tracklist,
        });

        album.save((error, resp) => {
          if (error) {
            reject(error.message);
          }

          if (resp) {
            var response = resp.toObject();

            delete response.__v;
            delete response._id;

            resolve(response);
          }

          resolve(null);
        });
      });
  });
}

module.exports = { create };
