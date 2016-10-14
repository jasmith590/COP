var marko = require('marko');
var fs = require('fs');
var path = require('path');


module.exports = function(template, data, cb) {
    var templateLocation = path.isAbsolute(template) ? template : process.cwd() + '/' + template;
    marko.load(templateLocation,{
      writeToDisk: false,
      preserveWhitespace: true
    }).render(data,cb);
};
