/**
 * to.js - copyright(c) 2012 openmason.
 * MIT Licensed
 */

/**
 * @todo add file parsers overwrites
 */

// dependencies
var path = require('path');
var basename = path.basename;
var fs = require('fs');
var inspect = require('util').inspect;
var handy = require('handy');
var _ = require('lodash');

/*
 * Holds all available formats
 */
exports.format = {};

// ------------
// All the modules to have the following methods
// - load(filename) 
//     returns the loaded doc
// - stringify(doc)
//     returns the stringified doc
// - support require(filename.format)
//     support require based loading data file

/**
 * Auto-load bundled format.
 */
fs.readdirSync(__dirname + '/modules').forEach(function (filename) {
    if (!/\.js$/.test(filename)) return;
    var name = basename(filename, '.js');

    function load() {
        return require('./modules/' + name);
    }

    exports.format.__defineGetter__(name, load);
});

/* Load given file
 */
exports.load = function (filename, input) {
    // lets try to find the appropriate format to load
    // the input file (based on file extension)
    // - if no extension, assume its json
    var inputformat, doc;

    if (input) {
        inputformat = input.toLowerCase();
    } else {
        inputformat = handy.getFileExtension(filename, 'json');
        inputformat = inputformat.toLowerCase();
    }
    inputformat = inputformat == 'yml' ? 'yaml' : inputformat;

    if (!this.isValidFormat(inputformat)) {
        // don't know how to load this filename
        throw "Unknown file format '" + inputformat + "'";
    }
    // load the file using appropriate module
    if (input) {
        doc = filename;
    } else {
        filename = filename.charAt(0) == '/' ? filename : (process.cwd() + '/' + filename);
        doc = fs.readFileSync(filename, 'utf-8');
    }

    return this.format[inputformat].load(doc);
};

/* Check if a given format can be loaded or not
 */
exports.isValidFormat = function (fmt) {
    if (!fmt || (Object.keys(this.format).indexOf(fmt.toLowerCase()) == -1 &&
        fmt.toLowerCase() != 'yml')) {
        return false;
    }
    return true;
};

/*
 * Check if a given format can be loaded or not
 */
exports.gatherInputs = function (filename, inputFormat) {
    var inputs = filename.split(",");
    inputFormat = inputFormat ? inputFormat : null;

    if(inputs.length > 1){
        input = {};

        for(var i = 0; i < inputs.length; i++){
            input = _.extend(input, this.load(inputs[i], inputFormat));
        }

        return input;
    } else {
        return this.load(filename, inputFormat);
    }

    return false;
};

/* Stringify given doc
 */
exports.stringify = function (doc) {
    return inspect(doc, false, 10, true);
};

/* Version of this lib
 */
exports.version = handy.getVersion();

