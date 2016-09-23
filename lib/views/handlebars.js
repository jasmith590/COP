var handlebars = require('handlebars');
var fs = require('fs');

module.exports = function(template, data) {
    var template = handlebars.compile(fs.readFileSync(process.cwd() + '/' + template, 'utf-8'));
    var outputString = template(data);

    return outputString;
}