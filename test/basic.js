var cop = require('..');
var expect = require("chai").expect;

describe('basic', function () {
    describe('list of modules', function () {
        var modulesAvailable = ['json', 'yaml', 'xml', 'shell'];

        it('should return the following modules', function (done) {
            expect(Object.keys(cop.format)).to.have.lengthOf(modulesAvailable.length);
            done();
        });

        it('check valid formats', function (done) {
            for (var i = 0; i < modulesAvailable.length; i++) {
                expect(cop.isValidFormat(modulesAvailable[i]), true).to.be.true;
            }
            done();
        });

        it('check invalid format', function (done) {
            expect(cop.isValidFormat('html'), true).to.be.false;
            done();
        });
    });

});
