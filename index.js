var fs   = require('fs');
var path = require('path');
var kitchen = require('broccoli-kitchen-sink-helpers');


module.exports = {
  name: 'ember-cli-bootstrap-sass',
  included: function included(app) {
    this.app = app;

    var emberCLIVersion = app.project.emberCLIVersion();
    if (emberCLIVersion < '0.0.41') {
      throw new Error('ember-cli-bootstrap-sass requires ember-cli version 0.0.41 or greater.\n');
    }

    var options         = app.options['ember-cli-bootstrap-sass'] || {};
    var modulePath      = path.relative(app.project.root, __dirname);
    var bootstrapPath   = 'vendor/bootstrap-sass-official/assets/';
    var emberBsPath     = 'vendor/ember-addons.bs_for_ember/dist'
    var javascriptsPath = path.join(emberBsPath, 'js');
    var jsFiles         = options.components ? options.components : fs.readdirSync(path.join(modulePath, javascriptsPath));

    // Import css from bootstrap
    // app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css'));
    // app.import(path.join(bootstrapPath, 'stylesheets/_bootstrap.scss'));
    app.import(path.join(emberBsPath, 'css/bs-growl-notifications.min.css'));

    // Import javascript files
    app.import(path.join(javascriptsPath, 'bs-core.max.js')); // Import bs-core first

    jsFiles.forEach(function(file) {
      var fileName = file.split('.')[0];
      app.import(path.join(javascriptsPath, fileName + '.max.js'));
    });

    if (options.importBootstrapJS) {
      app.import(path.join(bootstrapPath, 'javascripts/bootstrap.js'));
    }

    // Import glyphicons
    app.import(path.join(bootstrapPath, 'fonts/bootstrap/glyphicons-halflings-regular.eot'), { destDir: '/fonts' });
    app.import(path.join(bootstrapPath, 'fonts/bootstrap/glyphicons-halflings-regular.svg'), { destDir: '/fonts' });
    app.import(path.join(bootstrapPath, 'fonts/bootstrap/glyphicons-halflings-regular.ttf'), { destDir: '/fonts' });
    app.import(path.join(bootstrapPath, 'fonts/bootstrap/glyphicons-halflings-regular.woff'), { destDir: '/fonts' });

    //symlinking bootstrap sass styles to app dir
    var destBootstrapSourcePath = path.join(modulePath, 'app/styles/bootstrap');
    var destBootstrapPath = path.join(modulePath, 'app/styles/_bootstrap.scss');
    if (!fs.existsSync(destBootstrapSourcePath))  kitchen.symlinkOrCopyPreserveSync(path.join(modulePath,bootstrapPath, 'stylesheets/bootstrap'), destBootstrapSourcePath)
    if (!fs.existsSync(destBootstrapPath))  kitchen.symlinkOrCopyPreserveSync(path.join(modulePath,bootstrapPath, 'stylesheets/_bootstrap.scss'), destBootstrapPath)    
    
  }
};
