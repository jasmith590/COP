var helpers = require('./helpers');
var expect = require("chai").expect;
var exec = require('child_process').exec;

describe('CLI - Valid Templates', function() {

    describe('Handlebar Templates', function() {
        it("Valid template type", function(done) {
            exec(helpers.appRoot + 'bin/cop --input examples/setting.json --template examples/views/Dockerfile.hbs',
                function(error, stdout, stderr) {
                    expect(stdout.trim()).to.equal(helpers.readFixture("Dockerfile01"));
                    done();
                });
        });

        it("Valid template type with multiple inputs", function(done) {
            exec(helpers.appRoot + 'bin/cop --input examples/setting.json,examples/setting.yml --template examples/views/Dockerfile.hbs',
                function(error, stdout, stderr) {
                    expect(stdout.trim()).to.equal(helpers.readFixture("Dockerfile02"));
                    done();
                });
        });
    });
});
