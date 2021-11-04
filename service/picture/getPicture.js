const Picture = require("../../model/entity/picture");

function get(parentId) {
  return new Promise((resolve) => {
    Picture.find({ for: parentId })
      .sort({ currentlyUsed: -1 }) //sort by true, comes first
      .limit(30)
      .exec((err, picture) => {
        var response = {
          data: [],
        };

        if (picture.length > 0) {
          picture.forEach((pict) => {
            const dt = {
              id: pict.id,
              fileDirectory: pict.fileDirectory,
              currentlyUsed: pict.currentlyUsed,
            };

            response.data.push(dt);
          });

          return resolve(response);
        }
      });
  });
}

module.exports = { get };
