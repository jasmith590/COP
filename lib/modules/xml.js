var xmlparser = require('htmlparser');
var _ = require('lodash');
var js2xmlparser = require("js2xmlparser");
var helpers = require('../helpers');

/**
 * Parses XML into JSON
 *
 * @param doc
 * @returns {null|Array}
 */
exports.load = function(doc) {
    try {
        var handler = new xmlparser.DefaultHandler(function(error, dom) {
            if (error) {
                console.error(error);
                process.exit(1);
            } else {
                var cleanedObj = cleanDom(dom);
                cleanedObj = cleanedObj ? cleanedObj.length == 1 ? cleanedObj[0].config : cleanedObj.config : {};
                handler.dom = cleanedObj;
            }
        }, {
            verbose: false,
            ignoreWhitespace: true,
            enforceEmptyTags: false
        });
        var parser = new xmlparser.Parser(handler);
        parser.parseComplete(doc);
        return handler.dom;
    } catch (e) {
        console.error(e.stack || e.toString());
        process.exit(1);
    }
};

/**
 * Clean the dom:
 * - directives are removed
 * - tags are matched to keys and attributes are object k/v
 * - arrays properly cleaned up for json
 */
function cleanDom(dom) {
    var result = [];
    for (var i = 0; i < dom.length; i++) {
        var node = dom[i];

        if (node.type == 'directive') continue;
        if (node.type == 'tag') {
            var k = node.name;
            var v = node.attribs || {};
            var obj = {};
            obj[k] = v;
            if (node.hasOwnProperty("children")) {

                _.each(cleanDom(node.children), function(o) {
                    if (!_.isObject(o) || !_.isObject(v)) {
                        if (_.isObject(v)) {
                            if (_.size(v) == 0) {
                                v = o;
                            } else {
                                v['_text'] = o;
                            }
                        } else if (_.isArray(v)) {
                            v.push(o);
                        } else {
                            v = [v];
                            v.push(o);
                        }
                        obj[k] = !isNaN(v) ? parseInt(v) : v;
                    } else {
                        // first step is to merge same key items
                        // basically convert them to arrays
                        var sameKeys = _.intersection(_.keys(o), _.keys(v));
                        _.each(sameKeys, function(k) {
                            if (!_.isArray(v[k])) {
                                v[k] = [v[k]];
                            }
                            v[k] = v[k].concat(o[k]);
                        });
                        var remainingObj = _.omit(o, sameKeys);
                        _.extend(v, remainingObj);
                    }
                });
            }
            result.push(obj);
        }
        if (node.type == 'text') {
            result.push(node.data);
        }
    }

    return result;
}

/**
 * Parses JSON to XML, addes a config ROOT node
 *
 * @param doc
 * @returns {*|string}
 * @example output
 *   <?xml version='1.0'?>
 *   <config>
 *     <defaults>
 *       <cool>
 *         <sweet>nested settings</sweet>
 *       </cool>
 *       <from>alpine:3.3</from>
 *     </defaults>
 *   </config>
 */
exports.stringify = function(doc) {
    return js2xmlparser.parse(helpers.getConfigPrefix("config"), doc);
};
