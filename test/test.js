process.env.NODE_ENV = 'test';
var app = require('../app');
var passportStub = require('passport-stub');
var request = require('supertest');
var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
passportStub.install(app);


require('./tests/general')(app, passportStub, request, assert, should, expect);

