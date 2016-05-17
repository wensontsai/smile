var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

var supertest = require('supertest');
var request = require('request');
var mongoose = require('mongoose');
var sinon = require('sinon');
var api = supertest('http://localhost:3121');
var config = require ('../../config');
var server = require('../../app/server');

var UserTest = require('../../app/models/user');
// var myStub = sinon.stub(UserModel, 'addUser');

describe ('User routes', function() {
  beforeEach(function (done) {
    function clearDB() {
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(function() {});
      }
      return done();
    }
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(config.db.test, function (err) {
        if (err) {
          throw err;
        }
        return clearDB();
      });
    } else {
      return clearDB();
    }
  });

  it ('should get ALL users on /queryAllUsers GET', function(done) {
    chai.request(server)
      .get('/api/queryAllUsers')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
  

  it ('should add a SINGLE user on /addUser POST', function(done) {
    chai.request(server)
      .post('/api/addUser')
      .send({
        'firstName': 'test-firstname',
        'lastName': 'test-lastname',
        'email': 'test@test.com',
        'admin': 'N'
      })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('firstName');
        expect(res.body).to.have.property('lastName');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('admin');
        expect(res.body.firstName).to.equal('test-firstname');
        expect(res.body.lastName).to.equal('test-lastname');
        expect(res.body.email).to.equal('test@test.com');
        expect(res.body.admin).to.equal('N');
        expect(res.body.currentExam).to.be.null;

        done();
      });
  });

  afterEach(function (done) {
    mongoose.disconnect();
    return done();
  });



});