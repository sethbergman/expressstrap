'use_strict';
/*
index.js

-* expressstrap *-

This is the main logic file for the expressstrap, Express and Bootstrap
Yeoman boilerplate/scaffolding generator..

Author: Seth Bergman
License: MIT
*/

var Yeoman = require('yeoman-generator').Base,
     chalk = require('chalk'),
      path = require('path'),
    mkdirp = require('mkdirp'),
   slugify = require('underscore.string/slugify'),
     yosay = require('yosay');


module.exports = Yeoman.extend({
  constructor: function () {
    Yeoman.apply(this, arguments);

    this.option('skip-install');
    this.options = {};
    this.appName = '';

    // Greet the user.
    this.log(yosay(
      chalk.red('Welcome to the Magnificent ') + chalk.white('Express') + chalk.red(', ') + chalk.magenta('Bootstrap') + ' ' + chalk.white('ex') + chalk.magenta('press') + chalk.green('strap') + chalk.red('!')
    ));
},

  prompting: {
    //
    getDevName: function () {
      //
      var prompts = [{
        type: 'input',
        name: 'devName',
        message: 'Please enter your full name.',
        default: 'Anonymous Developer'
      }];

      return this.prompt(prompts)
                 .then(response => {
                   this.developer = response.devName;
                 });
    },

    getAppName: function () {
      //
      var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'What is the name of your new application?',
        default: 'app'
      }];

      return this.prompt(prompts)
                 .then(response => {
                   this.appName = response.appName;
                 });
    },

    createProjRoot: function () {
      //
      var prompts = [{
        type: 'confirm',
        name: 'createProjRoot',
        message: 'Would you like me to create a root for your project?'
      }];

      return this.prompt(prompts)
                 .then(response => {
                   this.options.createProjRoot = response.createProjRoot;
                 });
    },

    rootName: function () {
      //
      if (!this.options.createProjRoot) return true;

      var prompts = [{
        type: 'input',
        name: 'rootName',
        message: 'Input root name.',
        default: 'site'
      }];

      return this.prompt(prompts)
                 .then(response => {
                   this.options.rootName = response.rootName;
                 });
    },

    bootStrap: function () {
      //
      var prompts = [{
        type: 'list',
        name: 'bootStrap',
        message: 'Select a Bootstrap template.',
        choices: [
          'Cover',
          'Jumbotron',
          'Carousel',
          'Blog',
          'Dashboard',
          'Jumbotron-Narrow',
          'Signin'
        ],
        default: 'Cover',
        store: true
      }];

      return this.prompt(prompts)
                 .then(response => {
                   this.options.bootStrap = response.bootStrap;
                   this.bootstrapTmplt    = response.bootStrap.toLowerCase();
                 });
    }
  },

  writing: function () {
    // Create root, set destinationRoot..
    if (this.options.createProjRoot) {
      this.destinationRoot(this.options.rootName);
    }

    // Copy files..
    this.sourceRoot(path.join(__dirname, 'templates', 'files'));
    this.directory('.', '.');

    // Rename app.js and appName.js
    this.fs.move(path.join(this.destinationRoot(), 'app.js'), path.join(this.destinationRoot(), this.appName + '.js'));
    this.fs.move(path.join(this.destinationRoot(), '/public/js/src/appName.js'), path.join(this.destinationRoot(), '/public/js/src/' + this.appName + '.js'));

    // Copy Bootstrap template..
    this.sourceRoot(path.join(__dirname, 'templates'));
    this.copy(path.join('./Bootstrap', this.bootstrapTmplt, this.bootstrapTmplt + '.handlebars'), './views/' + this.bootstrapTmplt + '.handlebars');
    this.copy(path.join('./Bootstrap', this.bootstrapTmplt, this.bootstrapTmplt + '.css'), './public/css/' + this.bootstrapTmplt + '.css');
  },

  install: function () {
    if (!this.options['skip-install']) this.installDependencies();
  }
});
