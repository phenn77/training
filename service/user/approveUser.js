const User = require("../../model/entity/user/user");
const status = require("../../model/enum/status");

function approve(userId) {
  return new Promise(function (resolve, reject) {
    User.findOne({ _id: userId }, (err, data) => {
      if (!data) {
        console.log("User not found. User ID: %s", userId);

        return reject("User not found.");
      }

      if (status.REQUESTED !== data.status.toUpperCase()) {
        console.log("Cannot approve User. Status: %s", data.status);

        return reject("Cannot process User.");
      }

      data.status = status.APPROVED;

      User.updateOne(result, (err, result) => {
        if (result) {
          return resolve(data);
        }
      });
    });
  });
}

module.exports = {
  approve,
};
