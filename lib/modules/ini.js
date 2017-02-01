var helpers = require('../helpers');
var ini = require('ini');
/**
 * Parse JSON format into JS Object
 * @param doc
 */
exports.load = function (doc) {
    try {
        return ini.decode(doc);
    } catch (e) {
        console.error(e.stack || e.toString());
        process.exit(1);
    }
};

exports.stringify = function (doc) {
    var opts={
      whitespace: false
    };
    var configPrefix = helpers.getConfigPrefix();
    if(typeof configPrefix !== "undefined") {
      opts['section'] = configPrefix;
    }

    return ini.encode(doc, opts);
};
