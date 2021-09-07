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

    Album.findOne(
      { name: { $regex: new RegExp(`^${data.name}$`, "i") } },
      (err, result) => {
        console.log(result);
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
          artist: artistData.id,
        });

        album.save((error, resp) => {
          if (error) {
            reject(error.message);
          }

          if (resp) {
            resolve(resp);
          }

          resolve(null);
        });
      }
    );
  });
}

module.exports = { create };
