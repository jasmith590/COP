var helpers = require('./helpers');
var expect = require("chai").expect;
var cop = require('..');
var util = require('util');
var exec = require('child_process').exec;

var ioRoot=__dirname + '/fixtures/io';

describe('Input-Output Tests', function() {
  it('INI => YML', function(done) {
    exec(util.format("%s/bin/cop test.ini --json", helpers.appRoot), {cwd: ioRoot}, function(error, stdout, stderr) {
      expect(stdout).to.equal(helpers.readFixture("io/test.ini.output"));
      done();
    });
  });
});
