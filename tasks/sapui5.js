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

  //load SAP task
  grunt.loadNpmTasks('@sap/grunt-sapui5-bestpractice-build');

  // merging function
  var mergeWith = require('lodash.mergewith');
  var customizer = function (objValue, srcValue) {
    if (Array.isArray(objValue)) {
      return [srcValue].concat(objValue);
    }
  };


  // read config
  var oConfig = grunt.config();

  // read manifest.json
  var oManifest = grunt.file.readJSON(oConfig.dir.webapp + "/manifest.json");

  // if manifest exists
  if (oManifest) {

    // take sap.app version
    var oApp = oManifest["sap.app"];
    if (oApp) {
      switch (oApp.type) {
        // for libraries we should create library.json
        case "library":

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
                      src: '**/library.js',
                      dest: oConfig.dir.dist,
                      cwd: oConfig.dir.tmpDir

                    }
                  ]
                }
              }
            }, customizer
          );

          break;

        default:
          break;
      }
    }
  }

  // ToDo: replace with find function
  var bHasComponents = true;
  if (bHasComponents) {
    mergeWith(oConfig,
      {
        copy: {
          copyTmpToDist: {
            files: [
              {
                expand: true,
                src: '**/Component.js',
                dest: oConfig.dir.dist,
                cwd: oConfig.dir.tmpDir

              }
            ]
          }
        }
      }, customizer
    );
  }

  grunt.config("openui5_preload", oConfig.openui5_preload);
  grunt.config("copy", oConfig.copy);

  grunt.registerTask('default', [
    'lint',
    'clean',
    'build'
  ]);
};
