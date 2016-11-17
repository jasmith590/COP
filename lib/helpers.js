var handy = require('handy');
var _ = require('lodash');
var template = require('./template');

module.exports = {
    /**
     * Define our supported extensions
     */
    extensions: {
        'json': ['json', 'jsonp', 'js'],
        'shell': ['shell', 'vars', 'env'],
        'xml': ['xml', 'html'],
        'yaml': ['yaml', 'yml']
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

    getSupportedExtension: function(ext, object) {
        var self = this;
        return _.findKey((typeof object === "object" ? object : self.extensions), function(obj) {
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
     */
    checkStdInType: function(stdinType) {

        // Is config type
        if(this.getSupportedExtension(stdinType)){
            return "config";
        }

        // Is template type
        if(this.getSupportedExtension(stdinType, template.templateEngines)){
            return "template";
        }

        return false;
    },

    escapeQuotes: function(value) {
        value = (typeof value === "string")
            ? value.replace(/["']/g, '')
            : value;
        value = (parseInt(value) == value)
            ? parseInt(value)
            : value;

        return value;
    },

    /*
     * Export template module
     */
    render: template.render,

    /*
     * Export template engines
     */
    templateEngines: template.templateEngines
};
