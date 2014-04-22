'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    express: {
      server: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          bases: ['app'],
          livereload: true
        }
      }
    },

    open: {
      all: {
        path: 'http://localhost:<%= express.server.options.port%>'
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

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'app/styles/css/main.css': 'app/styles/scss/main.scss'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      src: 'app/js/!(vendor)'
    },

    watch: {
      html: {
        files: 'app/index.html',
        options: {
          livereload: true
        }
      }
    }

  });

  grunt.registerTask('serve', ['express', 'open', 'watch']);
}