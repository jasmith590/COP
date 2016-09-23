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

/**
 * Auto-load bundled format.
 */
fs.readdirSync(__dirname + '/modules').forEach(function (filename) {
    if (!/\.js$/.test(filename)) return;
    let name = basename(filename, '.js');

    function load() {
        return require('./modules/' + name);
    }

    exports.format.__defineGetter__(name, load);
});

/*
 * Load given file
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
        console.error("Unknown file format '" + inputformat + "'");
        process.exit(1);
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

/*
 * Check if a given format can be loaded or not
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
    var self = this;
    var inputs = this.isMultipleInputs(filename) || typeof filename === "string" ? filename : filename[0];
    inputFormat = inputFormat ? inputFormat : null;

    // Check if path exists
    if(!this.isMultipleInputs(filename) && !fs.existsSync(inputs)) {
        console.error("File does not exist '" + inputs + "'");
        process.exit(1);
    }

    // Check if directory
    if(!this.isMultipleInputs(filename) && fs.statSync(fs.realpathSync(inputs)).isDirectory()){
        inputs = this.fileList(fs.realpathSync(inputs), this.isValidFormat.bind(self));
    }

    // Supporting multiple inputs
    if(this.isMultipleInputs(filename) || this.isMultipleInputs(inputs)){
        inputs = inputs.map((filename) => fs.realpathSync(filename));
        let input = {};

        for(var i = 0; i < inputs.length; i++) {
            input = _.merge(input, this.load(inputs[i], inputFormat));
        }
        return input;
    } else {
        return this.load(fs.realpathSync(inputs), inputFormat);
    }

    return false;
};

/*
 * Gets all files in directory - recursvely
 */
exports.fileList = function(dir, testCase) {
    return fs.readdirSync(dir).reduce((list, file) => {
        let name = path.join(dir, file);
        let isDir = fs.statSync(name).isDirectory();

        // check for file EXT support
        if(!isDir && typeof testCase === "function" && !testCase(handy.getFileExtension(file))) {
            return list;
        }

        return list.concat(isDir ? this.fileList(name, testCase) : [name]);
    }, []);
};

/*
 * Checking if multiple inputs
 */
exports.isMultipleInputs = function(inputs) {
    return (typeof inputs === "object" && inputs.length) > 1 ? true : false;
};

/*
 * Stringify given doc
 */
exports.stringify = function (doc) {
    return inspect(doc, false, 10, true);
};

/*
 * Version of this lib
 */
exports.version = handy.getVersion();

/*
 * Export template module
 */
exports.render = require('./template').render;
