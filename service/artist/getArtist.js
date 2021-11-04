const Artist = require("../../model/entity/artist");

function get(artistId) {
  return new Promise((resolve, reject) => {
    Artist.findById(artistId)
      .populate({
        path: "members",
        select: "name",
        populate: {
          path: "pictures",
          match: { currentlyUsed: true },
        },
      })
      .populate({
        path: "albums",
        select: "name releaseYear",
        populate: {
          path: "pictures",
          match: { currentlyUsed: true },
        },
        options: { sort: { releaseYear: -1 } },
      })
      .populate({
        path: "singles",
        select: "name",
        populate: {
          path: "pictures",
          match: { currentlyUsed: true },
        },
        options: { sort: { releaseYear: -1 } },
      })
      .populate({
        path: "pictures",
        select: "fileDirectory",
        match: { currentlyUsed: true },
      })
      .exec((err, artist) => {
        if (!artist) {
          // console.log("Artist not found. Artist ID: %s", artistId);

          return reject("Artist not found.");
        }

        var resp = {
          id: artist.id,
          name: artist.name,
          origin: artist.origin,
          status: artist.status,
          summary: artist.summary,
          rating: artist.rating,
          website: artist.website,
          members: [],
          albums: [],
          singles: [],
          pictures: {},
        };

        if (artist.albums.length > 0) {
          artist.albums.forEach((alb) => {
            var album = {
              id: alb.id,
              name: alb.name,
              releaseYear: alb.releaseYear,
              pictures: {},
            };

            if (alb.pictures.length > 0) {
              album.pictures = {
                fileDirectory: alb.pictures[0].fileDirectory,
              };
            }

            resp.albums.push(album);
          });
        }

        if (artist.members.length > 0) {
          artist.members.forEach((mb) => {
            var member = {
              id: mb.id,
              name: mb.name,
              pictures: {},
            };

            if (mb.pictures.length > 0) {
              member.pictures = {
                fileDirectory: mb.pictures[0].fileDirectory,
              };
            }

            resp.members.push(member);
          });
        }

        if (artist.singles.length > 0) {
          artist.singles.forEach((sg) => {
            var single = {
              id: sg.id,
              name: sg.name,
              releaseYear: sg.releaseYear,
              pictures: {},
            };

            if (sg.pictures.length > 0) {
              single.pictures = {
                fileDirectory: sg.pictures[0].fileDirectory,
              };
            }

            resp.singles.push(single);
          });
        }

        if (artist.pictures.length > 0) {
          resp.pictures = {
            fileDirectory: artist.pictures[0].fileDirectory,
          };
        }

        return resolve(resp);
      });
  });
}

module.exports = {
  get,
};
