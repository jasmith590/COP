var dust = require('dustjs-linkedin');
var fs = require('fs');

// see: http://www.dustjs.com/docs/syntax/ for template syntax

module.exports = function(templatePath, data, cb) {
    dust.config.cache = false;
    dust.config.whitespace = true;
    dust.renderSource(fs.readFileSync(templatePath, 'utf-8'), data, cb);
}
