var yaml = require('js-yaml');

/*
 *  TODO, lots of concatenation (slow in js)
 */
var spacing = "  ";

exports.load = function (doc) {
    try {
        return this.loadContent(doc);
    } catch (e) {
        console.log(e.stack || e.toString());
    }
    throw "Error loading yaml file '" + filename + "'";
};

exports.loadContent = yaml.load;

exports.stringify = function (doc) {
    return this.json2yaml(doc);
};

exports.getType = function (obj) {
    var type = typeof obj;
    if (obj instanceof Array) {
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
        return 'hash';
    }
};

exports.convert = function (obj, ret) {
    var type = this.getType(obj);

    switch (type) {
        case 'array':
            this.convertArray(obj, ret);
            break;
        case 'hash':
            this.convertHash(obj, ret);
            break;
        case 'string':
            this.convertString(obj, ret);
            break;
        case 'null':
            ret.push('null');
            break;
        case 'number':
            ret.push(obj.toString());
            break;
        case 'boolean':
            ret.push(obj ? 'true' : 'false');
            break;
    }
};

exports.convertArray = function (obj, ret) {
    for (var i = 0; i < obj.length; i++) {
        var ele = obj[i];
        var recurse = [];
        this.convert(ele, recurse);

        for (var j = 0; j < recurse.length; j++) {
            ret.push((j == 0 ? "- " : spacing) + recurse[j]);
        }
    }
}

exports.convertHash = function (obj, ret) {
    for (var k in obj) {
        var recurse = [],
            ele = obj[k],
            type = this.getType(ele);

        // convert to Object
        this.convert(ele, recurse);

        if (type == 'string' || type == 'null' || type == 'number' || type == 'boolean') {
            ret.push(this.normalizeString(k) + ': ' + recurse[0]);
        } else {
            ret.push(this.normalizeString(k) + ': ');

            for (var i = 0; i < recurse.length; i++) {
                ret.push(spacing + recurse[i]);
            }
        }

    }
};

exports.normalizeString = function (str) {
    if (str.match(/^[\w]+$/)) {
        return str;
    } else {
        return JSON.stringify(str);
    }
};

exports.convertString = function(obj, ret) {
    ret.push(this.normalizeString(obj));
}

exports.json2yaml = function(obj) {
    if (typeof obj == 'string') {
        obj = JSON.parse(obj);
    }

    var ret = [];
    this.convert(obj, ret);
    return ret.join("\n");
};
