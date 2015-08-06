var concat = require('broccoli-concat'),  
    copy = require('broccoli-static-compiler'),
    sass = require('broccoli-sass-source-maps'),
    rev = require('broccoli-asset-rev'),
    merge = require('broccoli-merge-trees');

var babel = require('broccoli-babel-transpiler');
var browserify = require('broccolify');
var cssnano = require('broccoli-cssnano');
var uglify = require('broccoli-uglify-js');
var env = require('broccoli-env').getEnv();

var js = babel('javascripts', {});

js = browserify(js, {
  entries: ['./main.js'],
  outputFile: 'assets/main.js'
  // browserify: {
  //   debug: true
  // }
});

var css = sass(['stylesheets', 
                'bower_components/material-design-lite'
               ], 
               'main.scss', 
               'assets/styles.css');  

var html = 'source/public'

var result;

switch(env) {
  case 'development':
    result = merge([js, css, html]);
  break;
  case 'production':
    css = cssnano(css);
    js = uglify(js);
    result = rev(merge([js, css, html]));
  break;
}

module.exports = result;