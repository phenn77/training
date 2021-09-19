const Picture = require("../../model/entity/picture");

function get(parentId) {
  return new Promise((resolve, reject) => {
    Picture.find({ for: parentId })
      .sort({ currentlyUsed: -1 }) //sort by true, comes first
      .exec((err, picture) => {
        if (err) {
          reject(err.message);
        }

        if (picture.length > 0) {
          var response = [];
          picture.forEach((pict) => {
            response.push(pict.fileDirectory);
          });

          resolve(response);
        }

        resolve([]);
      });
  });
}

module.exports = { get };
