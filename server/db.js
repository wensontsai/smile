var Sequelize = require('sequelize');
var config = require ('./config');

module.exports = {

  initializeDb: function (port, env) {
    if (env === 'TEST') {
      var settings = this.createTestVariables(port);
    }
    else {
      var settings = this.createDevVariables(port);
    }
    
    var sequelize = new Sequelize(settings.database, config.username, port, {
      host: 'localhost',
      dialect: 'mysql',
      port: port,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    });

    sequelize
      .authenticate()
      .then(function(err) {
        console.log('\n', settings.dbSuccessMsg, '\n');
      })
      .catch(function (err) {
        console.log('\n', '==>  Unable to connect to the database:', err, '\n');
      });

  },

  createTestVariables: function (port) {
    return {
      port: port,
      database: config.test,
      dbSuccessMsg: ''
    }
  },

  createDevVariables: function (port) {
    return {
      port: port,
      database: config.dev,
      dbSuccessMsg: '==> DEV ENV: MySQL connection successful boyyÿÿÿÿÿÿ'
    }
  },

};

