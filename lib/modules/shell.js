var _ = require('lodash');
var vars = [];
var result = {};

/**
 * Parse Shell VAR format into JS Object
 * @param doc
 */
exports.load = function(doc) {
    return this.parse(doc);
};

exports.parse = function(shellvars) {
    var self = this;

    shellvars.split(/\n+/).forEach((assignment) => {
        var pieces = assignment.split('='),
            nesting = pieces[0].split('__'),
            value = self.parseValue(self.escapeQuotes(pieces[1]));

        nesting.reduce((obj, key, index, arr) => {
            if (index == arr.length - 1) {
                obj[key] = self.escapeQuotes(value);
                return self.escapeQuotes(value);
            }
            if (self.getType(obj[key]) !== 'object') {
                obj[key] = {};
            }
            return obj[key];
        }, result);
    });

    return result;
}

exports.parseValue = function(value) {
    // check for array value
    var match = /^\(\s*(.*?)\s*\)$/.exec(value);
    if (match) {
        return match[1].split(/\s+/);
    }
    return value;
};

exports.escapeQuotes = function(value) {
    value = (typeof value === "string")
        ? value.replace(/["']/g, '')
        : value;
    value = (parseInt(value) == value)
        ? parseInt(value)
        : value;

    return value;
};

exports.stringify = function(doc) {
    return this.outputVars(doc).join("\n");
};

exports.outputVars = function (doc, parentKey) {
    for (var parent in doc) {
        var parent_child = doc[parent],
            objType = this.getType(parent_child),
            key =  this.setKey(parentKey, parent);

        if(objType === 'object') {
            _.merge(vars, this.outputVars(parent_child, key));
        } else if (objType === 'string' || objType === 'boolean' || objType === 'number') {
            vars.push(key + '=' + this.normalizeString(parent_child));
        } else if (objType === 'array') {
            vars.push(key + '=' + this.parseArray(parent_child));
        }
    }
    return vars;
};

exports.normalizeString = function(value) {
    if(this.getType(value) === 'string') {
        return `"${value}"`;
    } else {
        return value;
    }
};

exports.parseArray = function(obj) {
    return '( ' + obj.map(function(value){
            return `"${value}"`;
        }).join(" ") + ' )';
};

exports.setKey = function(parentKey, key) {
    if(typeof parentKey === "undefined") {
        return key;
    } else {
        return parentKey + "__" + key;
    }
};

exports.getType = function(obj) {
    var type = typeof obj;

    if (Array.isArray(obj)) {
        return 'array';
    } else if (type == 'string') {
        return 'string';
    } else if (type == 'boolean') {
        return 'boolean';
    } else if (type == 'number') {
        return 'number';
    } else if (type == 'undefined' || obj === null) {
        return 'null';
    } else {
        return 'object';
    }
};