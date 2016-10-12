var dust = require('dustjs-linkedin');
var fs = require('fs');
var path = require('path');

// see: http://www.dustjs.com/docs/syntax/ for template syntax

module.exports = function(template, data, cb) {
    dust.config.cache = false;
    dust.config.whitespace = true;
    var templateLocation = path.isAbsolute(template) ? template : process.cwd() + '/' + template;
    dust.renderSource(fs.readFileSync(templateLocation, 'utf-8'), data, cb);
}
