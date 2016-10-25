var fs = require('fs');
var path = require('path');
var util = require('util');
var _ = require('lodash');

var templateEngines = {
  dust: ['dust'],
  handlebars: ['hbs','handlebars'],
  marko: ['marko'],
  nunjucks: ['njk','nunjucks', 'j2', 'jinja', 'jinja2']
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
            let templatePath = path.isAbsolute(template) ? template : process.cwd() + '/' + template;
            fs.accessSync(templatePath, (fs.constants || fs).R_OK);
            process.chdir(path.dirname(templatePath));
            return require(modulePath)(templatePath, config, cb);
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
