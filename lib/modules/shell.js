/*!
 * to.js - shell parser
 *
 * Copyright(c) 2012 Truepattern
 * MIT Licensed
 */

exports.load = function(doc) {
    try {
        return this.loadContent(doc);
    } catch (e) {
        console.log(e.stack || e.toString());
    }
};

exports.loadContent = function(json) {
    return JSON.parse(json);
};

exports.stringify = function(doc) {
    return Object.keys(doc).map(function(key){
        return `${key}=${doc[key]}`;
    }).join("\n");
};