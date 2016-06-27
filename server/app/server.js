var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

// var db = require('../db');

var app = express();


// ------------------------------------
// Environment & Database
// ------------------------------------
// if(process.env.NODE_ENV === 'TEST') {
//   var port = 3121;
//   var serverSuccessMsg = '🌎  *** TEST ENV *** fired up <== on port: ' + port;
//   var sequelize = db.initializeDb(port, 'TEST');
// } 

// var port = 3001
// var serverSuccessMsg = '🌎  DEV ENV: Magic is happening at http://localhost: ' + port;
// var sequelize = db.initializeDb(port, 'DEVELOPMENT');


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
// Sequelize - Models
// ------------------------------------
var models = require('./models/index');
var User = models.User;


// ------------------------------------
// Error Handling 
// ------------------------------------
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// // no stacktraces leaked to user unless in development environment
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: (app.get('env') === 'development') ? err : {}
//   });
// });


// ------------------------------------
// API Routes
// ------------------------------------
var apiRoutes = express.Router ();
app.use('/api', apiRoutes);

var userRoutes = require('./routes/userRoutes');
var sessionRoutes = require('./routes/sessionRoutes');

// ::::: GET :::::
// apiRoutes.get('/queryAllUsers', isAuthenticated, userRoutes.queryAllUsers(User));

// ::::: POST :::::
apiRoutes.get('/addUser', userRoutes.addUser(User));
// apiRoutes.post('/addUser', isAuthenticated, userRoutes.addUser(User));
// apiRoutes.post('/loginUser', sessionRoutes.loginUser(User, Session));
// apiRoutes.post('/logoutUser', isAuthenticated, sessionRoutes.logoutUser(User, Session));
// apiRoutes.post('/authenticateUser', sessionRoutes.authenticateUser(User, Session));

// ::::: DELETE :::::


models.sequelize.sync().then(function () {
  app.listen(3001);
  console.log('\n', 'merp', '\n');
});
// ------------------------------------
// HTTP server
// ------------------------------------
// app.listen(port);
// console.log('\n', serverSuccessMsg, '\n');

module.exports = app;