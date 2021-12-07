const User = require("../../model/entity/user/user");
const status = require("../../model/enum/status");

function block(userId) {
    return new Promise(function (resolve, reject) {
        User.findOne({_id: userId}, (err, data) => {
            if (!data) {
                console.log("User not found. User ID: %s", userId);

                reject("User not found. User ID: " + userId);
            }

            if (status.DELETED === data.status.toUpperCase()) {
                console.log("User is already deleted. Status: %s", data.status);

                reject("User is already deleted.");
            }

            data.status = status.DELETED;

            User.updateOne(data, (error, result) => {
                if (error) {
                    reject(error.message);
                }

                if (result) {
                    resolve(data);
                }

                resolve(null);
            });
        });
    });
}

module.exports = {
    block,
};
