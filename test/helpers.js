var fs = require('fs');
var path = require('path');

exports.appRoot = path.resolve(__dirname + '/..') + '/';

exports.readFixture = function(file) {
    return fs.readFileSync(process.cwd() + '/test/fixtures/' + file, 'utf-8')
}