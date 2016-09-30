var handy = require('handy');
var _ = require('lodash');

/**
 * Define our supported extensions
 */
exports.extensions = {
    'xml': ['xml'],
    'yaml': ['yml', 'yaml'],
    'json': ['json'],
    'shell': ['vars', 'env', 'conf']
};

exports.getFileExtension = function(file) {
    let ext = handy.getFileExtension(file);
    return (ext && this.getSupportedExtension(ext)) ? this.getSupportedExtension(ext) : ext;
};

exports.getSupportedExtension = function(ext) {
    var self = this;
    return _.findKey(self.extensions, function(obj) {
        return _.indexOf(obj, ext) >= 0;
    }) || false;
}