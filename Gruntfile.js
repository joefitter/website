'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    connect: {
      dev: {
        options: {
          port: 9000
        }
      }
    },

    bower: {
      install: {
        options: {
          verbose: true
        }
      }
    },

    clean: {
      prepare: 'app-built'
    },

    jshint: {
      options: {
        jshintrc: true
      },
      src: 'app/js/!(vendor)'
    },

    watch: {
      js: {
        files: 'app/js/**/*.js',
        tasks: ['jshint']
      }
    }
  });

  grunt.registerTask('serve', ['connect', 'watch']);
}