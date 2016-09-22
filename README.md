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
     $ bin/cop --input examples/setting.xml --to yaml
     
     # reads directory of inputs and prints it in yml
     $ bin/cop --input examples/ --to yaml
     
     # reads yaml and prints it in json
     $ bin/cop --input examples/setting.yml --to json
     
     # Accepts input from STDIN
     $ cat examples/setting.xml | bin/cop --from xml --to json
     
     # Accepts multiple inputs
     $ bin/cop --input examples/setting.json,examples/setting.yml --to json
     
     # Renders and compile templates to STDOUT 
     $ bin/cop --input examples/setting.json,examples/setting.yml --template examples/views/Dockerfile.hbs

Within your program:

    var cop = require('cop');
    
    # Load yaml
    var doc = cop.gatherInputs('setting.yml');
    
    # print doc in yaml 
    console.log(cop.format.yaml.stringify(doc));
    

## Test cases
To execute full test cases

    $ make

