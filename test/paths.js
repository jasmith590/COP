var helpers = require('./helpers');
var expect = require("chai").expect;
var exec = require('child_process').exec;

describe('Rendering Tempalte Valid Paths', function() {
    it("Aboslute path support", function(done) {
        exec('cp ' + helpers.exampleRoot + 'views/Dockerfile.hbs /tmp/Dockerfile.hbs', function() {
            exec(helpers.appRoot + 'bin/cop --render-template /tmp/Dockerfile.hbs examples/setting.json',
                function(error, stdout, stderr) {
                    expect(stdout.trim()).to.equal(helpers.readFixture("Dockerfile01"));
                    done();
                });
        })
    });

    it("Relative path support", function(done) {
        exec(helpers.appRoot + 'bin/cop --render-template examples/views/Dockerfile.hbs examples/setting.json',
            function(error, stdout, stderr) {
                expect(stdout.trim()).to.equal(helpers.readFixture("Dockerfile01"));
                done();
            });
    });
});

describe('Input File Valid Paths', function() {
    it("Aboslute path support", function(done) {
        exec('cp ' + helpers.exampleRoot + 'setting.json /tmp/setting.json', function() {
            exec(helpers.appRoot + 'bin/cop --yml /tmp/setting.json', function(error, stdout, stderr) {
                expect(stdout.trim()).to.equal(helpers.readFixture("setting.yml"));
                done();
            });
        })
    });

    it("Relative path support", function(done) {
        exec(helpers.appRoot + 'bin/cop --yml examples/setting.json', function(error, stdout, stderr) {
            expect(stdout.trim()).to.equal(helpers.readFixture("setting.yml"));
            done();
        });
    });
});