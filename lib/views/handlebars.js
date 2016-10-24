var handlebars = require('handlebars');
var fs = require('fs');

module.exports = function(templatePath, data, cb) {
    var template = handlebars.compile(fs.readFileSync(templatePath, 'utf-8'));
    return cb(null, template(data));
}
