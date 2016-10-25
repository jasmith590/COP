var _ = require('lodash');
var vars = [];
var result = {};
var helpers = require('../helpers');

/**
 * Parse Shell VAR format into JS Object
 * @param doc
 */
exports.load = function(doc) {
    return this.parse(doc);
};

/**
 * Parses Shell VAR format into JSON object
 * @param shellvars
 * @returns {{}}
 */
exports.parse = function(shellvars) {
    var self = this;

    shellvars.split(/\n+/).forEach((assignment) => {
        // Skip comment based lines start with '#'
        if (assignment.indexOf("#") >= 0) return;

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
    return this.outputVars(doc, null, helpers.getConfigPrefix()).join("\n");
};

/**
 * Parses JSON into basic Shell VAR format
 *
 * @param doc - JSON object
 * @param parentKey - recursive argument for child objects or arrays
 * @returns {Array}
 * @example output
 *   [
 *     'defaults__cool__sweet="nested settings"',
 *     'defaults__from="alpine:3.3"',
 *     'development__cool__sweet="nested settings"',
 *     'development__neat_setting=800',
 *   ]
 *
 */
exports.outputVars = function (doc, parentKey, keyOverride) {
    for (var parent in doc) {
        var parent_child = doc[parent],
            objType = this.getType(parent_child),
            key =  this.setKey(parentKey, parent, keyOverride);

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
    return (this.getType(value) === 'string') ? `"${value}"` : value;
};

/**
 * Parse JSON Array into Shell Var Array format
 * - Parses ["a", "b"] => ( "a" "b")
 *
 * @param obj
 * @returns {string}
 */
exports.parseArray = function(obj) {
    return '( ' + obj.map(function(value){
            return `"${value}"`;
        }).join(" ") + ' )';
};

/**
 * Creates a Shell Var name based on
 * a naming convention of 'PARENT__CHILD__CHILD'
 *
 * @param parentKey
 * @param key
 * @returns {string}
 */
exports.setKey = function(parentKey, key, keyOverride) {
    if((typeof parentKey === "undefined" || !parentKey) && typeof keyOverride !== "undefined") {
        return keyOverride + key;
    }
    return (typeof parentKey === "undefined" || !parentKey) ? key : parentKey + "__" + key;
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