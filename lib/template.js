var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

// Main template typecasting
var templateTypes = {
    hbs: 'handlebars.js'
};

exports.render = function(template, config) {
    // all module types in 'views'
    let templateModules = fileList(__dirname + '/views').map((file) => file.split(path.sep).slice(-1)[0]);
    let templateExt = getExtension(template);

    // Check if template rendering module exists
    if(templateTypes.hasOwnProperty(templateExt) && templateModules.indexOf(templateTypes[templateExt]) >= 0) {
        let modulePath = './views/' + templateTypes[templateExt];

        try {
            return require(modulePath)(fs.readFileSync(process.cwd() + '/' + template, 'utf-8'), config)
        } catch (e) {
            console.log(e.stack || e.toString());
        }
    } else {
        throw "Unknown template format '" + templateExt + "'";
    }
};

function fileList(dir) {
    return fs.readdirSync(dir).reduce((list, file) => {
        let name = path.join(dir, file);
        let isDir = fs.statSync(name).isDirectory();
        return list.concat(isDir ? fileList(name) : [name]);
    }, []);
}

function getExtension(filename) {
    let ext = path.extname(filename || '').split('.');
    return ext[ext.length - 1];
}
