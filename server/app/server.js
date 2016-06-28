import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';

const app = express();


// ------------------------------------
// Environment 
// ------------------------------------
const environment = ( () => {
  let port = (env) => {
    if(env === 'TEST') {
      return 3121;
    } else {
      return 3001;
    }
  }
  let successMsg = (env) => {
    if(env === 'TEST') {
      return '🌎  *** TEST ENV *** fired up <== on port: ' + port();
    } else {
      return '🌎  DEV ENV: Magic is happening at http://localhost: '+ port();
    }
  }
  return {
    port: port,
    successMsg: successMsg
  }
})();


// ------------------------------------
// Middleware
// ------------------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
// app.use(morgan('dev'));
app.use(cookieParser());

/*
/ JWT Token Verification for Admin Routes 
*/
const isAuthenticated = (req, res, next) => {
  // check header, or url parameters, or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verify secret and check expiration
    jwt.verify(token, app.get('secret'), (err, decoded) => {
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
const models = require('./models/index');
const User = models.User;




// ------------------------------------
// API Routes
// ------------------------------------
const apiRoutes = express.Router ();
app.use('/api', apiRoutes);

const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');


/*
// ::::: ERROR HANDLING :::::
*/
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});


/*
// ::::: GET :::::
*/
// apiRoutes.get('/queryAllUsers', isAuthenticated, userRoutes.queryAllUsers(User));


/*
// ::::: POST :::::
*/
apiRoutes.get('/addUser', userRoutes.addUser(User));
// apiRoutes.post('/addUser', isAuthenticated, userRoutes.addUser(User));
// apiRoutes.post('/loginUser', sessionRoutes.loginUser(User, Session));
// apiRoutes.post('/logoutUser', isAuthenticated, sessionRoutes.logoutUser(User, Session));
// apiRoutes.post('/authenticateUser', sessionRoutes.authenticateUser(User, Session));


/*
// ::::: DELETE :::::
*/


// ------------------------------------
// HTTP server
// ------------------------------------
models.sequelize.sync().then( () => {
  app.listen(environment.port(process.env.NODE_ENV));
  console.log('\n', environment.successMsg(process.env.NODE_ENV), '\n');
});

module.exports = app;