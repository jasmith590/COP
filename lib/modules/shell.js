/*!
 * to.js - shell parser
 */

var str = "";

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
    return parse(doc);
};

function parse(obj) {
    Object.keys(obj).map(function(key){
        if(typeof obj[key] === "object"){
            parse(obj[key]);
        }
        str += `${key}=${obj[key]}`;
    }).join("\n");

    return str;
}