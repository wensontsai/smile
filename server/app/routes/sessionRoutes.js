var jwt = require('jsonwebtoken');
var config = require ('../../config');

var Notifications = require('../notifications');

// bcrypt password hashing
import bcrypt from 'bcrypt';

exports.loginUser = function(User, Session, app) {
  return function(req, res, next) {
    var result = {};
    var messagesArray = [];

    User.findOne({ email: req.body.email }, function(err, user) {
      if(err) return console.error(err);
      if (!user) {
        Notifications.prepareMessagesArray(messagesArray, 'User Email not found!');
        return res.status(500).json({
          error:
            { messagesArray: messagesArray,
            }
        });
      }
      if (user.admin !== 'Y') {
        Notifications.prepareMessagesArray(messagesArray, 'User does not have Admin privileges!');
        return res.status(500).json({
          error:
            { messagesArray: messagesArray,
            }
        });
      }
      // verify password
      if( bcrypt.compareSync(req.body.password, user.password) === false ) {
        Notifications.prepareMessagesArray(messagesArray, 'Authentication failed.  Wrong password!');
        return res.status(500).json({
          error:
            { messagesArray: messagesArray,
            }
        });
      }

      var expiresIn = '24h';  //expires in 24hrs

      var token = jwt.sign(user, config.secret, {
        expiresIn: expiresIn
      });
      
      result = {
        success: true,
        message: 'Enjoy your token!',
        token: token,
        expiresIn: expiresIn,
        userId: user._id,
        userEmail: user.email
      }
      res.json(result);
    });
  };
}
exports.logoutUser = function(User, Session, app) {
  return function(req, res, next){
  var result = {};
    // logout session in DB

    // on success send back json
    result = {
      success: true
    }
    res.json(result);
  };
}

exports.authenticateUser = function(User, Session, app) {
  return function(req, res, next) {
    User.findOne({ name: req.body.email }, function(err, user) {
      if(err) return console.error(err);
      if (!user) {
        return res.json({ success: false, message: 'User Email not found!' });
      }
      if (user.admin !== 'Y') {
        return res.json({ success: false, message: 'User does not have Admin privileges!' });
      }
      if(user.password !== req.body.password) {
        return res.json({ success: false, message: 'Authentication failed.  Wrong password!' });
      }
      var token = jwt.sign(user, app.get('secret'), {
        expiresIn: 1440 //expires in 24hrs
      });

      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
    });
  };
}