var helpers = require('./helpers');
var expect = require("chai").expect;
var exec = require('child_process').exec;

describe('Input Arguements', function() {

    it("Valid input format type", function(done) {
        exec(helpers.appRoot + 'bin/cop --input examples/setting.json', function(error, stdout, stderr) {
            expect(stdout).to.equal(helpers.readFixture("setting.yml"));
            done();
        });
    });

    it("Invalid input format type", function(done) {
        exec(helpers.appRoot + 'bin/cop --input examples/setting.html', function(error, stdout, stderr) {
            expect(stderr).to.have.string("Unknown file format 'html'");
            done();
        });
    });

    it("Valid input for multiple input files", function(done) {
        exec(helpers.appRoot + 'bin/cop --input examples/setting.json,examples/setting.yml --to json', function(error, stdout, stderr) {
            expect(stdout).to.equal(helpers.readFixture("settings.json"));
            done();
        });
    });
});
