const Artist = require("../../model/entity/artist");

function create(data) {
  return new Promise((resolve, reject) => {
    Artist.findOne(
      { name: { $regex: new RegExp(`^${data.name}$`, "i") } },
      (err, result) => {
        if (result) {
          console.log("Artist already exist. Name: %s", data.name);

          return reject("Artist already exist.");
        }

        const artist = new Artist({
          name: data.name,
          origin: data.origin,
          status: data.status,
          summary: data.summary,
          website: data.website,
        });

        artist.save((error, resp) => {
          if (error) {
            reject(error.message);
          }

          if (resp) {
            const response = resp.toObject();

            delete response.__v;
            delete response._id;

            resolve(response);
          }

          resolve(null);
        });
      }
    );
  });
}

module.exports = { create };
