const Artist = require("../../model/entity/artist");

function getAll() {
  return new Promise((resolve, reject) => {
    Artist.find({}, { name: 1 })
      .sort({ name: 1 })
      .populate({ path: "pictures", select: "fileDirectory" })
      .exec((err, artist) => {
        if (artist) {
          const result = [];

          artist.forEach((data) => {
            const resp = data.toObject();

            delete resp._id;
            delete resp.__v;

            if (resp.pictures.length > 0) {
              resp.pictures = {
                fileDirectory: resp.pictures[0].fileDirectory,
              };
            } else {
              resp.pictures = {};
            }

            result.push(resp);
          });

          resolve(result);
        }

        resolve([]);
      });
  });
}

module.exports = { getAll };
