var chai = require('chai');
var chaiHttp = require('chai-http');

chai.config.includeStack = true;

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

chai.use(chaiHttp);