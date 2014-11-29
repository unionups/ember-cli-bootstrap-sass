var fs   = require('fs');
var path = require('path');

var path_join = function(){
  // fix path with windows back slash with path_join
  return path.join.apply(this, arguments).replace(/\\/g, '/');
};

module.exports = {
  name: 'ember-cli-bootstrap-sass',
  included: function included(app) {
    this.app = app;
    var emberCLIVersion = app.project.emberCLIVersion();
    if (emberCLIVersion < '0.0.41') {
      throw new Error('ember-cli-bootstrap-sass requires ember-cli version 0.0.41 or greater.\n');
    }

    var options         = app.options['ember-cli-bootstrap-sass'] || {};
    var ibs_opts        = options.importBootstrapJS
    var modulePath      = path.relative(app.project.root, __dirname);
    var bootstrapPath   = 'vendor/bootstrap-sass-official/assets';
    var emberBsPath     = 'vendor/ember-addons.bs_for_ember/dist';
    var javascriptsPath = path_join(emberBsPath, 'js');
    
    switch (options.components) {
      case true:
        var jsFiles = fs.readdirSync(path_join(modulePath, javascriptsPath));
        break
      case false:
        var jsFiles = false;
        break
      default:
        var jsFiles = options.components ? options.components : fs.readdirSync(path_join(modulePath, javascriptsPath));
        break
    }


  // Non-destructively add paths to SASS
  // Non-destructively add paths to SASS
  app.options.sassOptions = app.options.sassOptions || {}
  app.options.sassOptions.includePaths = app.options.sassOptions.includePaths || []
  
	app.options.sassOptions.includePaths.push(path_join(modulePath, bootstrapPath, 'stylesheets'));
	app.options.sassOptions.includePaths.push(path_join(modulePath, bootstrapPath, 'stylesheets/bootstrap'));
	app.options.sassOptions.includePaths.push(path_join(modulePath, bootstrapPath, 'stylesheets/bootstrap/mixins'));

    // Import css from bootstrap

    app.import(path_join(emberBsPath, 'css/bs-growl-notifications.min.css'));

    if ((jsFiles !== []) && (jsFiles !== false) ) {
      // Import javascript files from bootstrap-for-ember
      app.import(path_join(javascriptsPath, 'bs-core.max.js')); // Import bs-core first

      jsFiles.forEach(function(file) {
        var fileName = file.split('.')[0];
        app.import(path_join(javascriptsPath, fileName + '.max.js'));
      });
    }

    // Import js from bootstrap
    if(ibs_opts === true) {
      app.import(path_join(bootstrapPath, 'javascripts/bootstrap.js'));
    } else if (ibs_opts instanceof Array){
      ibs_opts.forEach(function(fileName) {
        app.import(path_join(bootstrapPath, 'javascripts/bootstrap', fileName + '.js'));
      });  
    }

    // Import glyphicons
    app.import(path_join(bootstrapPath, 'fonts/bootstrap/glyphicons-halflings-regular.eot'), { destDir: '/fonts/bootstrap' });
    app.import(path_join(bootstrapPath, 'fonts/bootstrap/glyphicons-halflings-regular.svg'), { destDir: '/fonts/bootstrap' });
    app.import(path_join(bootstrapPath, 'fonts/bootstrap/glyphicons-halflings-regular.ttf'), { destDir: '/fonts/bootstrap' });
    app.import(path_join(bootstrapPath, 'fonts/bootstrap/glyphicons-halflings-regular.woff'), { destDir: '/fonts/bootstrap' });


  }
};
