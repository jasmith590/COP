var marko = require('marko');

module.exports = function(templatePath, data, cb) {
    marko.load(templatePath,{
      writeToDisk: false,
      preserveWhitespace: true
    }).render(data,cb);
};
