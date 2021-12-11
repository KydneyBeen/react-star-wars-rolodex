const webpackConfig = require("./webpack.config.js");
module.exports = (grunt) => {
  // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      copy: {
        'dist/public/index.html': 'src/frontend/index.html',
        'dist/public/favicon.ico': 'src/frontend/favicon.ico',
        'dist/public/styles/style.css': 'src/frontend/styles/style.css',
        'dist/public/assets/img/background.jpg': 'src/frontend/assets/img/background.jpg',
        'dist/public/styles/bs.min.css': 'node_modules/bootstrap/dist/css/bootstrap.min.css'
      },
      'ts': {
        "frontend": {
          "tsconfig": "./frontend.tsconfig.json"
        },
        "default": {
          "tsconfig": "tsconfig.json"
        }
      },
      'babel': {
        options: {
          sourceMap: false,
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        },
        dist: {
          files: {
            'dist/public/scripts/app.js': 'dist/frontend/scripts/app.js',
            'dist/public/scripts/components/component-imports.js': 'dist/frontend/scripts/components/component-imports.js',
            'dist/public/scripts/components/loader.js': 'dist/frontend/scripts/components/loader.js',
            'dist/public/scripts/components/main.js': 'dist/frontend/scripts/components/main.js',
            'dist/public/scripts/components/modal-section.js': 'dist/frontend/scripts/components/modal-section.js',
            'dist/public/scripts/components/modal.js': 'dist/frontend/scripts/components/modal.js',
            'dist/public/scripts/components/scroller-person.js': 'dist/frontend/scripts/components/scroller-person.js',
            'dist/public/scripts/components/scroller.js': 'dist/frontend/scripts/components/scroller.js',
            'dist/public/scripts/components/search.js': 'dist/frontend/scripts/components/search.js',
          }
        }
      },
      webpack: {
        default: webpackConfig
      }
    });
  
    // Load the plugin
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-webpack');
  
    // Default task(s).
    grunt.registerTask('default', ['ts', 'babel', 'webpack', 'copy']);
  
  };