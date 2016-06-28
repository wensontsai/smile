exports.addUser = function(User) {
  return function(req, res, next) {
    User.create({
      username: 'jon',
      password: 'snowwwww'
    }).then(function(user) {
      console.log(user);
    });

    // User.findOne({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email }, function(err, user) {
    //   if(err) return console.error(err);
    //   if (user) {
    //     Notifications.prepareMessagesArray(messagesArray, 'This user already exists!');
    //     return res.status(500).json({
    //       error:
    //         { messagesArray: messagesArray,
    //         }
    //     });
    //   } else {
    //     var salt = bcrypt.genSaltSync(10);
    //     var hashedPassword = bcrypt.hashSync(req.body.password, salt);

    //     var user = new User({
    //       firstName: req.body.firstName,
    //       lastName: req.body.lastName,
    //       email: req.body.email,
    //       password: hashedPassword,
    //       admin: req.body.admin
    //     });
    //     user.save(function(err, user) {
    //       if(err) return console.error(err);
    //       res.json(user);
    //     });
    //   }
    // });
  };
};



// var Notifications = require('../notifications');

// // bcrypt password hashing
// var bcrypt = require('bcrypt');

// exports.addUser = function(User) {
//   return function(req, res, next) {
//     var messagesArray = [];

//     User.findOne({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email }, function(err, user) {
//       if(err) return console.error(err);
//       if (user) {
//         Notifications.prepareMessagesArray(messagesArray, 'This user already exists!');
//         return res.status(500).json({
//           error:
//             { messagesArray: messagesArray,
//             }
//         });
//       } else {
//         var salt = bcrypt.genSaltSync(10);
//         var hashedPassword = bcrypt.hashSync(req.body.password, salt);

//         var user = new User({
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//           email: req.body.email,
//           password: hashedPassword,
//           admin: req.body.admin
//         });
//         user.save(function(err, user) {
//           if(err) return console.error(err);
//           res.json(user);
//         });
//       }
//     });
//   };
// };

// exports.queryAllUsers = function(User) {
//   return function(req, res, next) {
//     User.find({}, function(err, users) {
//       if(err) return console.error(err);
//       res.json(users);
//     });
//   };
// };