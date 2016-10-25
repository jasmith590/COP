var helpers = require('./helpers');
var expect = require("chai").expect;
var exec = require('child_process').exec;

describe('CLI - STDIN Support', function() {

    it("Configuration - YAML to Shell w/out COP_PREFIX", function(done) {
        exec('curl https://raw.githubusercontent.com/jasmith590/COP/develop/examples/shell.yml | ' +
              helpers.appRoot + 'bin/cop --shell --stdin-type=yaml', function(error, stdout, stderr) {
            expect(stdout.trim()).to.equal(helpers.readFixture('.envars.txt'));
            done();
        });
    });

    it("Configuration - YAML to Shell w/ COP_PREFIX=\"config__\"", function(done) {
        exec('export COP_PREFIX="config__" && ' +
            'curl https://raw.githubusercontent.com/jasmith590/COP/develop/examples/shell.yml | ' +
            helpers.appRoot + 'bin/cop --shell --stdin-type=yaml', function(error, stdout, stderr) {
            expect(stdout.trim()).to.equal(helpers.readFixture('.envars.prefix.txt'));
            done();
        });
    });

    it("Template", function(done) {
        exec('curl https://raw.githubusercontent.com/jasmith590/COP/develop/examples/views/Dockerfile.hbs | ' +
            helpers.appRoot + 'bin/cop --stdin-type=hbs examples/setting.json', function(error, stdout, stderr) {
            expect(stdout.trim()).to.equal(helpers.readFixture('Dockerfile01'));
            done();
        });
    });
});
