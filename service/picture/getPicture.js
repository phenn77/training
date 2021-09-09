const Picture = require("../../model/entity/picture");

function get(parentId) {
  return new Promise((resolve, reject) => {
    Picture.findAll({ by: parentId }, (err, picture) => {
      if (picture) {
        let response = picture.toObject();

        delete response._id;
        delete response.__v;

        resolve(response);
      }

      resolve(null);
    });
  });
}

module.exports = { get };
