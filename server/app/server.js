var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

var db = require('../db');

var app = express();


// ------------------------------------
// Environment & Database
// ------------------------------------
if(process.env.NODE_ENV === 'TEST') {
  var port = 3121;
  var serverSuccessMsg = '🌎  *** TEST ENV *** fired up <== on port: ' + port;
  db.initializeDb(port, 'TEST');
} 

var port = 3001
var serverSuccessMsg = '🌎  DEV ENV: Magic is happening at http://localhost: ' + port;
db.initializeDb(port, 'DEVELOPMENT');


// ------------------------------------
// Middleware
// ------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
// app.use(morgan('dev'));
app.use(cookieParser());


// JWT Token Verification for Admin Routes
function isAuthenticated(req, res, next) {
  // check header, or url parameters, or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verify secret and check expiration
    jwt.verify(token, app.get('secret'), function(err, decoded) {
      if (err) {
        return res.json( { success: false, message: 'Failed to authenticate token!' } );
      }
      req.decoded = decoded;
      console.log('token decoded successfully ->');
      next();
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided!'
    });
  }
}


// ------------------------------------
// Mongoose - Models
// ------------------------------------
var User = require('./models/user');
var Session = require('./models/session');


// ------------------------------------
// API Routes
// ------------------------------------
var apiRoutes = express.Router ();
app.use('/api', apiRoutes);

var userRoutes = require('./routes/userRoutes');
var sessionRoutes = require('./routes/sessionRoutes');

// ::::: GET :::::
apiRoutes.get('/queryAllUsers', isAuthenticated, userRoutes.queryAllUsers(User));

// ::::: POST :::::
apiRoutes.post('/addUser', isAuthenticated, userRoutes.addUser(User));
apiRoutes.post('/loginUser', sessionRoutes.loginUser(User, Session));
apiRoutes.post('/logoutUser', isAuthenticated, sessionRoutes.logoutUser(User, Session));
apiRoutes.post('/authenticateUser', sessionRoutes.authenticateUser(User, Session));

// ::::: DELETE :::::



// ------------------------------------
// HTTP server
// ------------------------------------
app.listen(port);
console.log('\n', serverSuccessMsg, '\n');

module.exports = app;