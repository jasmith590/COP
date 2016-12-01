var helpers = require('./helpers');
var expect = require("chai").expect;
var exec = require('child_process').exec;

describe('Built APP test', function() {

    it("Valid input format type - file", function(done) {
        exec(helpers.appRoot + 'build/cop --yml examples/setting.json', function(error, stdout, stderr) {
            expect(stdout.trim()).to.equal(helpers.readFixture("setting.yml"));
            done();
        });
    });

    it("Valid input format type - directoy", function(done) {
        exec(helpers.appRoot + 'build/cop --yml examples/', function(error, stdout, stderr) {
            expect(stdout.trim()).to.equal(helpers.readFixture("dir_settings.yml"));
            done();
        });
    });

    it("Invalid input format type", function(done) {
        exec(helpers.appRoot + 'build/cop examples/setting.unknown', function(error, stdout, stderr) {
            expect(stderr.trim()).to.have.string("Unknown file format 'unknown'");
            done();
        });
    });

    it("File does not exist", function(done) {
        exec(helpers.appRoot + 'build/cop examples/setting.txt', function(error, stdout, stderr) {
            expect(stderr.trim()).to.have.string("File does not exist 'examples/setting.txt'");
            done();
        });
    });

    it("Valid input for multiple input files", function(done) {
        exec(helpers.appRoot + 'build/cop --json examples/settings01.yml examples/settings02.yml', function(error, stdout, stderr) {
            expect(stdout.trim()).to.equal(helpers.readFixture("settings.json"));
            done();
        });
    });

    it("Skips over comments within Shell VARs", function(done) {
        exec(helpers.appRoot + 'build/cop --yaml examples/shell.vars', function(error, stdout, stderr) {
            expect(stdout.trim()).to.equal(helpers.readFixture("shell.yml"));
            done();
        });
    });

    it("Regex pattern to match support", function(done) {
        exec(helpers.appRoot + "build/cop examples/settings01.yml examples/settings02.yml --yml --filter='^(?!test)'", function(error, stdout, stderr) {
            expect(stdout.trim()).to.equal(helpers.readFixture("filtered.yml"));
            done();
        });
    });
});
