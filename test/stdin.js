var helpers = require('./helpers');
var expect = require("chai").expect;
var exec = require('child_process').exec;

describe('CLI - STDIN Support', function() {

    it("Configuration - YAML to Shell w/out COP_PREFIX", function(done) {
        exec('curl -s https://raw.githubusercontent.com/jasmith590/COP/develop/examples/shell.yml | ' +
              helpers.appRoot + 'bin/cop --shell --stdin-type=yaml', function(error, stdout, stderr) {
            expect(stdout.trim()).to.equal(helpers.readFixture('.envars.txt'));
            done();
        });
    });

    it("Configuration - YAML to Shell w/ COP_PREFIX=\"config__\"", function(done) {
        exec('export COP_PREFIX="config__" && ' +
            'curl -s https://raw.githubusercontent.com/jasmith590/COP/develop/examples/shell.yml | ' +
            helpers.appRoot + 'bin/cop --shell --stdin-type=yaml && ' +
            'unset COP_PREFIX', function(error, stdout, stderr) {
            expect(stdout.trim()).to.equal(helpers.readFixture('.envars.prefix.txt'));
            done();
        });
    });

    it("Configuration - Unknown file type errors out", function(done) {
        exec('curl -s https://raw.githubusercontent.com/jasmith590/COP/develop/examples/shell.yml | ' +
            helpers.appRoot + 'bin/cop --shell --stdin-type=unknown', function(error, stdout, stderr) {
            expect(stderr.trim()).to.equal("Unknown file format 'unknown'");
            done();
        });
    });

    it("Template", function(done) {
        exec('curl -s https://raw.githubusercontent.com/jasmith590/COP/develop/examples/views/Dockerfile.hbs | ' +
            helpers.appRoot + 'bin/cop --stdin-type=hbs examples/setting.json', function(error, stdout, stderr) {
            expect(stdout.trim()).to.equal(helpers.readFixture('Dockerfile01'));
            done();
        });
    });

    it("Template - Unknown file type errors out", function(done) {
        exec('curl -s https://raw.githubusercontent.com/jasmith590/COP/develop/examples/views/Dockerfile.hbs | ' +
            helpers.appRoot + 'bin/cop --stdin-type=unknown examples/setting.json', function(error, stdout, stderr) {
            expect(stderr.trim()).to.equal("Unknown file format 'unknown'");
            done();
        });
    });
});
