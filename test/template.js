var helpers = require('./helpers');
var expect = require("chai").expect;
var exec = require('child_process').exec;

describe('CLI - Valid Templates', function() {

    describe('Handlebar Templates', function() {
        it("Valid template type", function(done) {
            exec(helpers.appRoot + 'bin/cop --render-template examples/views/Dockerfile.hbs examples/setting.json',
                function(error, stdout, stderr) {
                    expect(stdout.trim()).to.equal(helpers.readFixture("Dockerfile01"));
                    done();
                });
        });

        it("Valid template type with multiple inputs", function(done) {
            exec(helpers.appRoot + 'bin/cop --render-template examples/views/Dockerfile.hbs examples/setting.json examples/setting.yml',
                function(error, stdout, stderr) {
                    expect(stdout.trim()).to.equal(helpers.readFixture("Dockerfile02"));
                    done();
                });
        });
    });

    describe('Dust Templates', function() {
        it("Valid template type", function(done) {
            exec(helpers.appRoot + 'bin/cop --render-template examples/views/Dockerfile.dust examples/setting.json',
                function(error, stdout, stderr) {
                    expect(stdout.trim()).to.equal(helpers.readFixture("Dockerfile01"));
                    done();
                });
        });

        it("Valid template type with multiple inputs", function(done) {
            exec(helpers.appRoot + 'bin/cop --render-template examples/views/Dockerfile.dust examples/setting.json examples/setting.yml',
                function(error, stdout, stderr) {
                    expect(stdout.trim()).to.equal(helpers.readFixture("Dockerfile02"));
                    done();
                });
        });
    });

    describe('Nunjucks Templates', function() {
        it("Valid template type", function(done) {
            exec(helpers.appRoot + 'bin/cop --render-template examples/views/Dockerfile.njk examples/setting.json',
                function(error, stdout, stderr) {
                    expect(stdout.trim()).to.equal(helpers.readFixture("Dockerfile01"));
                    done();
                });
        });

        it("Valid template type with multiple inputs", function(done) {
            exec(helpers.appRoot + 'bin/cop --render-template examples/views/Dockerfile.njk examples/setting.json examples/setting.yml',
                function(error, stdout, stderr) {
                    expect(stdout.trim()).to.equal(helpers.readFixture("Dockerfile02"));
                    done();
                });
        });
    });
});
