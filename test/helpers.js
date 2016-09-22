var fs = require('fs');
var path = require('path');

exports.appRoot = path.resolve(__dirname + '/..') + '/';
exports.exampleRoot = path.resolve(__dirname + '/..') + '/examples/';

exports.readFixture = function(file) {
    return fs.readFileSync(process.cwd() + '/test/fixtures/' + file, 'utf-8')
}

exports.readExample = function(file) {
    return fs.readFileSync(exports.exampleRoot + file, 'utf-8')
}