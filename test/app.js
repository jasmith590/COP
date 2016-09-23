var helpers = require('./helpers');
var expect = require("chai").expect;
var cop = require('..');

describe('APP Tests', function() {

    describe('Config Input Loading', function() {
        it("JSON to JSON", function(done) {
            let doc = cop.gatherInputs(helpers.exampleRoot + 'setting.json');
            expect(cop.format.json.stringify(doc)).to.equal(helpers.readFixture('setting.json'));
            done();
        });

        it("JSON to XML", function(done) {
            let doc = cop.gatherInputs(helpers.exampleRoot + 'setting.json');
            expect(cop.format.xml.stringify(doc)).to.equal(helpers.readFixture('setting.xml'));
            done();
        });

        it("JSON to YAML", function(done) {
            let doc = cop.gatherInputs(helpers.exampleRoot + 'setting.json');
            expect(cop.format.yaml.stringify(doc)).to.equal(helpers.readFixture('setting.yml'));
            done();
        });

        it("XML to JSON", function(done) {
            let doc = cop.gatherInputs(helpers.exampleRoot + 'setting.xml');
            expect(cop.format.json.stringify(doc)).to.equal(helpers.readFixture('setting.json'));
            done();
        });

        it("XML to YAML", function(done) {
            let doc = cop.gatherInputs(helpers.exampleRoot + 'setting.xml');
            expect(cop.format.yaml.stringify(doc)).to.equal(helpers.readFixture('setting.yml'));
            done();
        });

        it("YAML to JSON", function(done) {
            let doc = cop.gatherInputs(helpers.exampleRoot + 'setting.yml');
            expect(cop.format.json.stringify(doc)).to.equal(helpers.readFixture('setting.json'));
            done();
        });

        it("YAML to XML", function(done) {
            let doc = cop.gatherInputs(helpers.exampleRoot + 'setting.yml');
            expect(cop.format.xml.stringify(doc)).to.equal(helpers.readFixture('setting.xml'));
            done();
        });
    });

});