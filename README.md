[![Build Status](https://travis-ci.org/jasmith590/COP.svg?branch=develop)](https://travis-ci.org/jasmith590/COP)

# COP - Configuration Option Parser

collection of convertors.
Comes with command line options to use the convertors along with a library version that can be used within programs as well.

# Solves
  * read input formats json, xml, yaml, shell VARs 
  * converts the document to internal javascript object form
  * write output as json, yaml, shell VARs and xml documents
  * converts handlebars template files

## Installation

    $ npm install -g cop
        
    OR
    
    $ npm install cop
    
    OR 
    
    $ make

## Usage

Command line:

     # reads xml file and prints it in yml
     $ bin/cop --yml examples/setting.xml
     
     # reads directory of inputs and prints it in yml
     $ bin/cop --yaml examples/
     
     # reads yaml and prints it in json
     $ bin/cop examples/setting.yml --json
     
     # reads shell VARs and prints it in json
     $ bin/cop examples/shell.vars --json
     
     # Accepts multiple inputs
     $ bin/cop --json examples/setting.json examples/setting.yml
     
     # Renders and compile templates to STDOUT 
     $ bin/cop --render-template examples/views/Dockerfile.hbs examples/setting.json examples/setting.yml
     
     # Accept configuration input from STDIN
     $ curl https://raw.githubusercontent.com/jasmith590/COP/develop/examples/setting.yml | bin/cop --shell --stdin-type=yaml
     
     # Accept template input from STDIN
     $ curl https://raw.githubusercontent.com/jasmith590/COP/develop/examples/views/Dockerfile.hbs | bin/cop --stdin-type=hbs examples/setting.json

Within your program:

    var cop = require('cop');
    
    # Load yaml
    var doc = cop.gatherInputs('setting.yml');
    
    # Load multiple files
    var doc = cop.gatherInputs(['setting.yml', 'setting.xml']);
    
    # print doc in yaml 
    console.log(cop.format.yaml.stringify(doc));

## STDIN Support
In order to allow better STDIN support, a prefix enviroment variable has been added. In order to use:

    $ export COP_PRESET="config__"
    $ curl https://api.github.com/repos/jasmith590/COP/tags | bin/cop --shell --stdin-type=json
    
What does this do? This allows you to add a prefix to the output formats. For example, if you have a preset of "config__", then [this](https://api.github.com/repos/jasmith590/COP/tags) will turn into the below:

```
config__0__name="0.3.0"
config__0__zipball_url="https://api.github.com/repos/jasmith590/COP/zipball/0.3.0"
config__0__tarball_url="https://api.github.com/repos/jasmith590/COP/tarball/0.3.0"
config__0__commit__sha="726e1994e98df36c1058166ddc8802624cf3f5bd"
config__0__commit__url="https://api.github.com/repos/jasmith590/COP/commits/726e1994e98df36c1058166ddc8802624cf3f5bd"
config__1__name="0.2.0"
config__1__zipball_url="https://api.github.com/repos/jasmith590/COP/zipball/0.2.0"
config__1__tarball_url="https://api.github.com/repos/jasmith590/COP/tarball/0.2.0"
config__1__commit__sha="0c42fad98ed0ebb6ee987d1e5611fc045ed73f52"
config__1__commit__url="https://api.github.com/repos/jasmith590/COP/commits/0c42fad98ed0ebb6ee987d1e5611fc045ed73f52"
```

## Test cases
To execute full test cases

    $ make test


## Adding Rendering Engines
Adding another rendering engine requires two main things

First edit the file [template.js](/lib/template.js). Add the extension and filename.

```
// Main template typecasting
var templateEngines = {
  dust: ['dust'],
  handlebars: ['hbs','handlebars'],
  marko: ['marko'],
  nunjucks: ['njk','nunjucks', 'j2', 'jinja', 'jinja2']
};
```

The add your rendering module within [views](/lib/views/). For an example of a template module, view this [file](/lib/views/handlebars.js)