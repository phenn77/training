const Album = require("../../model/entity/album");

function getAll() {
  return new Promise((resolve, reject) => {
    Album.find()
      .sort({ name: 1 })
      .populate({ path: "pictures", select: "fileDirectory" })
      .exec((err, artist) => {
          if (artist) {
              const result = []; 

              artist.forEach((data) => {
                  const resp = data.toObject();

                  delete resp._id;
                  delete resp.__v;

                  result.push(resp)
              })

              resolve(result);
          }

          resolve(null);

      });
  });
}

module.exports = { getAll };
