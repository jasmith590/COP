var fs = require('fs');
var path = require('path');
var cop = require('./cop');
var util = require('util');
var _ = require('lodash');

var templateEngines = {
  handlebars: ['hbs','handlebars']
};

exports.templateEngines = templateEngines;

exports.render = function(template, config, cb) {
    // get engine by template file extension
    let engine = _.findKey(templateEngines, function(extensions){
      return extensions.indexOf(getExtension(template)) >= 0;
    });

    if(engine) {
        try {
            let modulePath = util.format('./views/%s.js', engine);
            return require(modulePath)(template, config, cb);
        } catch (e) {
            console.log(e.stack || e.toString());
        }
    } else {
        console.error(util.format("missing template engine for .%s files", getExtension(template)));
        process.exit(1);
    }
};

function getExtension (filename) {
    let ext = path.extname(filename || '').split('.');
    return ext[ext.length - 1];
}
