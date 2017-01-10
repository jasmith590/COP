var ejs = require('ejs');

// see: https://github.com/mde/ejs

module.exports = function(templatePath, data, cb) {
    var options = {
      cache: false,
      compileDebug: false,
      rmWhitespace: false
    }
    ejs.renderFile(templatePath, data, options, cb);
}
