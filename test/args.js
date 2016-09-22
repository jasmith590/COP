var helpers = require('./helpers');
var expect = require("chai").expect;
var exec = require('child_process').exec;

describe('CLI - Input Arguements', function() {

    it("Valid input format type", function(done) {
        exec(helpers.appRoot + 'bin/cop --input examples/setting.json', function(error, stdout, stderr) {
            expect(stdout.trim()).to.equal(helpers.readFixture("setting.yml"));
            done();
        });
    });

    it("Invalid input format type", function(done) {
        exec(helpers.appRoot + 'bin/cop --input examples/setting.html', function(error, stdout, stderr) {
            expect(stderr.trim()).to.have.string("Unknown file format 'html'");
            done();
        });
    });

    it("Valid input for multiple input files", function(done) {
        exec(helpers.appRoot + 'bin/cop --input examples/settings01.yml,examples/settings02.yml --to json', function(error, stdout, stderr) {
            expect(stdout.trim()).to.equal(helpers.readFixture("settings.json"));
            done();
        });
    });
});
