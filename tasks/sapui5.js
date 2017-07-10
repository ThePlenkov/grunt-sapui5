/*
 * grunt-sapui5
 * https://github.com/pplenkov/grunt-sapui5
 *
 * Copyright (c) 2017 theplenkov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  'use strict';
  grunt.loadNpmTasks('@sap/grunt-sapui5-bestpractice-build');

  var oConfig = grunt.config();

  var mergeWith = require('lodash.mergewith');

  var customizer = function (objValue, srcValue) {
    if (Array.isArray(objValue)) {
      return [srcValue].concat(objValue);
    }
  };

  var sRoot = oConfig.dir.root.replace(/[.]/, '/');

  mergeWith(oConfig,
    {

      openui5_preload: {
        preloadTmp: {
          options: {
            compatVersion: "1.38",
            resources: {
              prefix: sRoot
            },
          },
          libraries: true
        }
      },
      copy: {
        copyTmpToDist: {
          files: [
            {
              expand: true,
              src: '**/Component.js',
              dest: oConfig.dir.dist,
              cwd: oConfig.dir.tmpDir

            },
            {
              expand: true,
              src: '**/library.js',
              dest: oConfig.dir.dist,
              cwd: oConfig.dir.tmpDir

            }
          ]
        }
      }
    }, customizer
  );

  grunt.config("openui5_preload", oConfig.openui5_preload);
  grunt.config("copy", oConfig.copy);

  grunt.registerTask('default', [
    'lint',
    'clean',
    'build'
  ]);
};
