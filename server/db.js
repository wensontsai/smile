var Sequelize = require('sequelize');
var config = require ('./config.json');

module.exports = {

  initializeDb: function (port, env) {
    if (env === 'TEST') {
      var settings = this.createSettings(port, "test");
    }
    if (env === 'DEVELOPMENT') {
      var settings = this.createSettings(port, "development");
    }
    
    var sequelize = new Sequelize(settings.database, settings.username, settings.password, settings.password, settings.port, {
      host: settings.host,
      dialect: settings.dialect,
      port: settings.port,
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

    return sequelize;

  },

  createSettings: function (port, env) {
    if(env === 'test') {
      var settings = config.test;
      settings['dbSuccessMsg'] = '==> TEST ENV: MySQL connection successful';
    }
    if(env === 'development') {
      var settings = config.development;
      settings['dbSuccessMsg'] = '==> DEV ENV: MySQL connection successful boyyÿÿÿÿÿÿ';
    }
    return settings;
  },

};

