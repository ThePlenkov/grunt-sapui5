# grunt-sapui5

> Recently SAP released new Web IDE version and grunt plugin for building SAPUI5 projects

You can find more details here:
https://www.sap.com/developer/tutorials/webide-grunt-basic.html

or here:
https://help.sap.com/viewer/825270ffffe74d9f988a0f0066ad59f0/T03b.2017/en-US/1e375da920484bbcb7c46b7b369f137e.html

After starting using it I found a problem: it didn't work for libraries

Reviewing the source code I realized that in fact it was just a plugin reusing grunt-openui5 plugin but in a very restricted configuration.

Also there were more issue we solved with the current plugin:
- We left minified Component.js file in the build ( sometimes while navigation we still need them )
- We transform folder name into module name ( a.b.c into a/b/c ) in preload-* files

## Getting Started

This plugin can be used both locally and in the cloud-based IDE. To use it you need to have at least one dependency in your package.json file

```json  
  "devDependencies": {
    "grunt-sapui5": "^1.3.18-g"
  }
```

To build the project you'll need Gruntfile.js containing at least these lines:
```js
module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-sapui5');
};
```

To build the project just type grunt in the console for your project.

Please notice the standard SAP plugin requires webapp folder.

Meanwhile you can redefine config in your Gruntfile.js in a similar way like I did in sapui5.js

## Release History
_(Nothing yet)_
