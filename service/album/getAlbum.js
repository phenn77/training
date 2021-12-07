const Album = require("../../model/entity/album");

function get(albumId) {
    return new Promise((resolve, reject) => {
        Album.findById(albumId)
            .populate({path: "artist", select: "name"})
            .populate({path: "pictures", select: "fileDirectory"})
            .exec((error, album) => {
                if (!album) {
                    // console.log("Album not found. Album ID: %s", albumId);
                    return reject("Album not found.");
                }

                var data = {
                    id: album.id,
                    name: album.name,
                    releaseYear: album.releaseYear,
                    artist: {
                        id: album.artist.id,
                        name: album.artist.name,
                    },
                    tracklist: album.tracklist,
                };

                if (album.pictures.length > 0) {
                    data.pictures = {
                        fileDirectory: album.pictures[0].fileDirectory,
                    };
                }

                return resolve(data);
            });
    });
}

module.exports = {get};
