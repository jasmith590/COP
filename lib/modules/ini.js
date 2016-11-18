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
        console.log(e.stack || e.toString());
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
