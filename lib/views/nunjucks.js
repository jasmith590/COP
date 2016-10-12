var nunjucks = require('nunjucks');
var fs = require('fs');
var path = require('path');

module.exports = function(template, data, cb) {
    nunjucks.configure({
      autoescape: false,
      noCache: true
    });
    var templateLocation = path.isAbsolute(template) ? template : process.cwd() + '/' + template;
    nunjucks.renderString(fs.readFileSync(templateLocation, 'utf-8'), data, cb);
};
