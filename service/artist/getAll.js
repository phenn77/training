const Artist = require("../../model/entity/artist");

function getAll() {
  return new Promise((resolve, reject) => {
    Artist.find()
      .sort({ name: 1 })
      .populate({ path: "pictures", select: "url" })
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
