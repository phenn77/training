const Album = require("../../model/entity/album");
const Artist = require("../../model/entity/artist");

async function create(data) {
  const retrieveData = new Promise((resolve) => {
    Artist.findById({ _id: data.artist }, (err, artist) => {
      if (err) {
        return resolve(null);
      }

      return resolve(artist);
    });
  });
  const artistData = await Promise.resolve(retrieveData);

  return new Promise((resolve, reject) => {
    if (artistData === null) {
      return reject("Artist not found.");
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
          // console.log(
          //   "Album already exist. Name: %s by %s",
          //   result.name,
          //   result.artist.name
          // );

          return reject("Album already exist.");
        }

        const album = new Album({
          name: data.name,
          releaseYear: data.releaseYear,
          artist: artistData.id,
          tracklist: data.tracklist,
        });
        
        album.save((error, resp) => {
          var response = {
            id: resp.id,
            name: resp.name,
            releaseYear: resp.releaseYear,
            tracklist: resp.tracklist,
            artist: {
              id: artistData.id,
              name: artistData.name,
            },
          };

          return resolve(response);
        });
      });
  });
}

module.exports = { create };
