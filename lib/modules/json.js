var helpers = require('../helpers');

/**
 * Parse JSON format into JS Object
 * @param doc
 */
exports.load = function (doc) {
    try {
        return this.loadContent(doc);
    } catch (e) {
        console.log(e.stack || e.toString());
    }
};

exports.loadContent = function (json) {
    return JSON.parse(json);
};

exports.stringify = function (doc) {
    var configPrefix = helpers.getConfigPrefix();

    // Look for a prefix, if so, then reset doc
    // based on that.
    if(typeof configPrefix !== "undefined") {
        var parentObj = {};
        parentObj[configPrefix] = doc;

        // reset doc to prefixed object
        doc = parentObj;
    }

    return JSON.stringify(doc, null, 2);
};
