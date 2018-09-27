
module.exports = function (grunt) {
  'use strict';

  //load SAP task
  grunt.loadNpmTasks('@sap/grunt-sapui5-bestpractice-build');

  require("grunt-sapui5-config")(grunt); 

  grunt.registerTask('default', [
    'lint',
    'clean',
    'build'
  ]);
};
