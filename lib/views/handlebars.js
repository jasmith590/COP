var handlebars = require('handlebars');

module.exports = function(source, data) {
    var template = handlebars.compile(source);
    var outputString = template(data);

    return outputString;
}