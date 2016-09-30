var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

module.exports = function(template, data) {
    var templateLocation = path.isAbsolute(template) ? template : process.cwd() + '/' + template;
    var template = handlebars.compile(fs.readFileSync(templateLocation, 'utf-8'));
    var outputString = template(data);

    return outputString;
}