// const User = require("../../model/entity/user/user");
// const status = require("../../model/enum/status");

// function create(data) {
//   return new Promise(function (resolve, reject) {
//     const exist = User.findOne({
//       $or: [
//         {
//           email: data.email,
//         },
//         {
//           username: data.username,
//         },
//       ],
//     });

//     if (exist) {
//       reject("User already existed");
//     }

//     const user = new User({
//       name: data.name,
//       username: data.username,
//       email: data.email,
//       password: data.password,
//       birthday: data.birthday,
//       status: status.REQUESTED,
//     });

//     const data = null;
//     try {
//       data = user.save(user);
//     } catch (e) {
//       reject("Failed to save User");
//     }

//     resolve(data);
//   });
// }

// module.exports = create;
