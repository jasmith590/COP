var cop = require('..');
var expect = require("chai").expect;
var _ = require('lodash');
var helpers = require('./helpers');

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

    describe('getSupportedExtension()', function () {
        [
          'env',
          'html',
          'js',
          'json',
          'jsonp',
          'shell',
          'vars',
          'xml',
          'yaml',
          'yml'
        ].forEach(function(module) {
            it(module, function(done) {
                expect(helpers.coreHelpers.getSupportedExtension(this.test.title)).to.be.ok
                done();
            });
        });
    });

    function getSupportedExtension() {
        return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
            return prev + curr;
        }, 0);
    }

});
