var to = require('..');
var helpers = require('./helpers');
var expect = require("chai").expect;
var exec = require('child_process').exec;

describe('help', function() {

    describe("Test Basic API", function() {
        it("bin/cop", function(done) {
            exec(helpers.appRoot + 'bin/cop', function(error, stdout, stderr) {
                expect(stdout).to.equal(helpers.readFixture("help.txt"));
                done();
            });
        });
    });
});
