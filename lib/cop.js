var path = require('path');
var basename = path.basename;
var fs = require('fs');
var inspect = require('util').inspect;
var handy = require('handy');
var _ = require('lodash');
var helpers = require('./helpers');
var modules = require('./modules');

/**
 * Holds all available formats
 */
exports.format = {};

/**
 * Auto-load bundled format.
 */
helpers.getExtensions().map(function(name){
    exports.format[name] = modules[name];
});

/**
 * Load given file
 */
exports.load = function (filename, options) {
    var inputformat = helpers.getFileExtension(filename), doc;

    if (!this.isValidFormat(inputformat) && helpers.checkStdInType(filename) !== "template") {
        // don't know how to load this filename
        console.error("Unknown file format '" + inputformat + "'");
        process.exit(1);
    }

    // load the file using appropriate module
    filename = filename.charAt(0) == '/' ? filename : (process.cwd() + '/' + filename);
    doc = fs.readFileSync(filename, 'utf-8');

    // grab formated output
    var output = this.format[inputformat].load(doc);

    if(this.checkForOption(options, 'filter') && this.checkForOption(options, 'filter').length > 0) {
        output = this.filter(output, options.filter);
    }

    return output;
};

/**
 * Check if a given format can be loaded or not
 */
exports.gatherInputs = function (filename, options) {
    var self = this;
    var inputs = helpers.isMultipleInputs(filename) || typeof filename === "string" ? filename : filename[0];

    // Check if path exists
    if(!helpers.isMultipleInputs(filename) && !fs.existsSync(inputs)) {
        console.error("File does not exist '" + inputs + "'");
        process.exit(1);
    }

    // Check if directory
    if(!helpers.isMultipleInputs(filename) && fs.statSync(fs.realpathSync(inputs)).isDirectory()){
        inputs = this.fileList(fs.realpathSync(inputs), this.isValidFormat.bind(self));
    }

    // Supporting multiple inputs
    if(helpers.isMultipleInputs(filename) || helpers.isMultipleInputs(inputs)){
        inputs = inputs.map((filename) => fs.realpathSync(filename));
        let input = {};

        for(var i = 0; i < inputs.length; i++) {
            input = _.merge(input, this.load(inputs[i], options));
        }
        return input;
    } else {
        return this.load(fs.realpathSync(inputs), options);
    }

    return false;
};

/**
 * Gets all files in directory - recursvely
 */
exports.fileList = function(dir, testCase) {
    return fs.readdirSync(dir).reduce((list, file) => {
        let name = path.join(dir, file);
        let isDir = fs.statSync(name).isDirectory();
        let ext = helpers.getFileExtension(file);

        // check for file EXT support
        if(!isDir && typeof testCase === "function" && !testCase(ext)) {
            return list;
        }

        return list.concat(isDir ? this.fileList(name, testCase) : [name]);
    }, []);
};

/**
 * Pattern matching based on filters set per regex expressions

 * @param obj
 * @param patterns
 * @returns {*}
 */
exports.filter = function(obj, patterns) {
    return _.pickBy(obj, function(value, key){
        for (var i = 0; i < patterns.length; i++)
            if (key.match(patterns[i]))
                return true;

        return false;
    });
};

/**
 * Savees input form STDIN into the
 * "tmp" directory.
 *
 * @todo should delete after process is complete
 * @param input
 * @param ext
 * @returns {string}
 */
exports.saveTmpFile = function(input, ext) {
    var templatePath = '/tmp/cop_input.' + ext;
    fs.writeFileSync(templatePath, input);
    return templatePath;
};

/**
 * Checks configuration options for existing config
 *
 * @param options
 * @param option
 * @returns {boolean} || {object}
 */
exports.checkForOption = function(options, option){
    return (typeof options === "object" && options.hasOwnProperty(option)) ? options[option] : false;
};

/**
 * Stringify given doc
 */
exports.stringify = function (doc) {
    return inspect(doc, false, 10, true);
};

exports.checkStdInType = helpers.checkStdInType.bind(helpers);

/**
 * Version of this lib
 */
exports.version = handy.getVersion();

/*
 * Export template module
 */
exports.render = helpers.render;

/**
 * Export template engines
 */
exports.templateEngines = helpers.templateEngines;

/**
 * Export configuration supported extensions
 */
exports.supportedExts = helpers.extensions;

/**
 * Export check for a valid format
 */
exports.isValidFormat = helpers.isValidFormat.bind(this);
