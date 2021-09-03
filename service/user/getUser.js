const User = require("../../model/entity/user/user");

function get(userId) {
  return new Promise(function (resolve, reject) {
    User.findOne({ _id: userId }, (err, result) => {
      if (!result) {
        console.log("User not found. User ID: %s", userId);

        return reject("User not found.");
      }

      return resolve(result);
    });
  });
}

module.exports = {
  get,
};
