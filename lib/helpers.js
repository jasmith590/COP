var handy = require('handy');
var _ = require('lodash');

module.exports = {
    /**
     * Define our supported extensions
     */
    extensions: {
        'xml': ['xml'],
        'yaml': ['yml', 'yaml'],
        'json': ['json'],
        'shell': ['vars', 'env', 'conf']
    },

    isMultipleInputs: function(inputs) {
        return (typeof inputs === "object" && inputs.length) > 1 ? true : false;
    },

    isValidFormat: function (fmt) {
        if (!fmt || (Object.keys(this.format).indexOf(fmt.toLowerCase()) == -1 &&
            fmt.toLowerCase() != 'yml')) {
            return false;
        }
        return true;
    },

    getFileExtension: function(file) {
        let ext = handy.getFileExtension(file);
        return (ext && this.getSupportedExtension(ext)) ? this.getSupportedExtension(ext) : ext;
    },

    getSupportedExtension: function(ext) {
        var self = this;
        return _.findKey(self.extensions, function(obj) {
                return _.indexOf(obj, ext) >= 0;
            }) || false;
    },

    /**
     * Grabs a ENV VAR that can exist to prefix
     * the config output data.
     * !!!Only use for output!!!
     *
     * @param fallback
     * @returns string
     */
    getConfigPrefix: function(fallback) {
        return this.escapeQuotes(_.get(process.env, "COP_PREFIX", fallback));
    },

    /**
     * Checks STDIN type and compares it to available
     * formats for both configuration and templates.
     * Checks for templates first, if none are found,
     * move on to configs.
     *
     * @returns {string|string}
     */
    checkStdInType: function(stdinType) {
        return "template" || "config";
    },

    escapeQuotes: function(value) {
        value = (typeof value === "string")
            ? value.replace(/["']/g, '')
            : value;
        value = (parseInt(value) == value)
            ? parseInt(value)
            : value;

        return value;
    }
};