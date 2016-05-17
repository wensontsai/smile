var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

var server = require('../app/server');

chai.use(chaiHttp);