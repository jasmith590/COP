var nunjucks = require('nunjucks');
var fs = require('fs');

module.exports = function(templatePath, data, cb) {
    nunjucks.configure({
      autoescape: false,
      noCache: true
    });
    nunjucks.renderString(fs.readFileSync(templatePath, 'utf-8'), data, cb);
};
