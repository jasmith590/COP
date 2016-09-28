# COP - Configuration Option Parser

collection of convertors.
Comes with command line options to use the convertors along with a library version that can be used within programs as well.

# Solves
  * read input formats json, xml, yaml 
  * converts the document to internal javascript object form
  * write output as json, yaml and xml documents
  * converts handlebars template files

## Installation

    $ npm install -g cop
        
    OR
    
    $ npm install cop
    
    OR 
    
    $ make install

## Usage

Command line:

     # reads xml file and prints it in yml
     $ bin/cop --yml examples/setting.xml
     
     # reads directory of inputs and prints it in yml
     $ bin/cop --yaml examples/
     
     # reads yaml and prints it in json
     $ bin/cop examples/setting.yml --json
     
     # Accepts multiple inputs
     $ bin/cop --json examples/setting.json examples/setting.yml
     
     # Renders and compile templates to STDOUT 
     $ bin/cop --render-template examples/views/Dockerfile.hbs examples/setting.json examples/setting.yml

Within your program:

    var cop = require('cop');
    
    # Load yaml
    var doc = cop.gatherInputs('setting.yml');
    
    # print doc in yaml 
    console.log(cop.format.yaml.stringify(doc));
    

## Test cases
To execute full test cases

    $ make


## Adding Rendering Engines
Adding another rendering engine requires two main things

First edit the file [template.js](/lib/template.js). Add the extension and filename.

```javascript
// Main template typecasting
var templateTypes = {
    hbs: 'handlebars.js',
    ext: 'file name of rendering module in views'
};
```

The add your rendering module within (views)[/lib/views/]. For an example of a template module, view this [file](/lib/views/handlebars.js)