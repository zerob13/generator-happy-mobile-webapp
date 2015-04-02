'use strict';

var join = require('path').join;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.pkg = require('../package.json');
  },

  askFor: function() {
    var done = this.async();
    // welcome message
    if (!this.options['skip-welcome-message']) {
      this.log(require('yosay')());
      this.log(chalk.magenta(
        'Out of the box I include HTML5 Boilerplate, Zepto.js, and a ' +
        'Gruntfile.js to build your app.'
      ));
    }

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'jQuery',
        value: 'includejQuery',
        checked: false
      }, {
        name: 'Sass',
        value: 'includeSass',
        checked: true
      }, {
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: false
      }, {
        name: 'Mustache.js',
        value: 'includeMustache',
        checked: true
      }, {
        name: 'CacheManifest',
        value: 'includeCache',
        checked: false
      }]
    }];

    this.prompt(prompts, function(answers) {
      var features = answers.features;

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1;
      }

      this.includeSass = hasFeature('includeSass');
      this.includejQuery = hasFeature('includejQuery');
      this.includeModernizr = hasFeature('includeModernizr');
      this.includeCache = hasFeature('includeCache');
      this.includeMustache = hasFeature('includeMustache');

      done();
    }.bind(this));
  },

  gruntfile: function() {
    this.template('Gruntfile.js');
  },

  packageJSON: function() {
    this.template('_package.json', 'package.json');
  },

  git: function() {
    this.template('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  },

  bower: function() {
    var bower = {
      name: this._.slugify(this.appname),
      private: true,
      dependencies: {}
    };

    if (this.includejQuery) {
      bower.dependencies['jquery'] = "*";
    } else {
      bower.dependencies.zepto = "~1.1.6";
    }

    if (this.includeModernizr) {
      bower.dependencies.modernizr = "~2.8.2";
    }

    if (this.includeMustache) {
      bower.dependencies.mustache = "~1.0.0";
    }

    this.write('bower.json', JSON.stringify(bower, null, 2));
  },

  jshint: function() {
    this.copy('jshintrc', '.jshintrc');
  },

  editorConfig: function() {
    this.copy('editorconfig', '.editorconfig');
  },

  mainStylesheet: function() {
    var css = 'main.' + (this.includeSass ? 's' : '') + 'css';
    this.template(css, 'app/styles/' + css);
  },

  writeIndex: function() {
    this.indexFile = this.engine(
      this.readFileAsString(join(this.sourceRoot(), 'index.html')),
      this
    );

    this.indexFile = this.appendFiles({
      html: this.indexFile,
      fileType: 'js',
      optimizedPath: 'scripts/main.js',
      sourceFileList: ['scripts/main.js'],
      searchPath: ['app', '.tmp']
    });
  },
  test: function() {
    this.directory('test');
    this.copy('test.js', 'test/test.js');
  },

  app: function() {
    this.directory('app');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('app/images');
    if (this.includeMustache) {
      this.mkdir('app/template');
      this.write('app/template/main.mst', '{{title}}');
    }
    this.write('app/index.html', this.indexFile);
    this.write('app/scripts/main.js', '$(function(){console.log(\'done\');})');
  },

  install: function() {
      if (!this.options['skip-install']) {
        this.installDependencies({
          skipInstall: this.skipInstall
        });
      }
  }
});
