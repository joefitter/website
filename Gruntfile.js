'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'built'
      }
    },

    usemin: {
      html: ['built/index.html']
    },

    copy: {
      task: {
        src: 'app/index.html',
        dest: 'built/index.html'
      }
    },

    express: {
      server: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          bases: ['app'],
          livereload: true
        }
      },
      built: {
        options: {
          port: 9000,
          hostname: '0.0.0.0',
          bases: ['built']
        }
      }
    },

    clean: {
      prepare: 'built'
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

    cssmin: {
      dist: {
        files: {
          'app/styles/css/main.min.css': 'app/styles/css/main.css'
        }
      }
    },

    bowerInstall: {
      target: {
        src: ['app/index.html','app/styles/css/*.css'],
        ignorePath: 'app/'
      },
      css: {
        src: 'app/styles/css/*.css'
      }
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
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      html: {
        files: 'app/index.html',
        options: {
          livereload: true
        }
      },
      styles: {
        files: 'app/styles/scss/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      }
    }

  });

  grunt.registerTask('build', [
    'clean',
    'copy',
    'useminPrepare',
    'sass',
    'bowerInstall',
    'concat',
    'cssmin',
    'uglify',
    'usemin'
  ])

  grunt.registerTask('serve', ['express', 'open', 'watch']);
  grunt.registerTask('serveBuilt', ['express:built', 'open', 'watch']);
}