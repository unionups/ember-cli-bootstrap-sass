ember-cli-bootstrap-sass
========================

###ember-cli-bootstrap-sass requires ember-cli version '0.0.41' or later

This is an ember-cli addon that includes styles from [official Sass port](http://getbootstrap.com/css/#sass) of [Twitter Bootstrap](http://getbootstrap.com/) into your ember-cli project.

This addon utilizes the [bootstrap_for_ember](https://github.com/ember-addons/bootstrap-for-ember) library, which provides a collection of Ember components based on Twitter Bootstrap V3.
You can find documentation for usage [here](https://github.com/ember-addons/bootstrap-for-ember).

#Installation

In the root of your ember-cli project directory, run:
```bash
npm install --save-dev ember-cli-bootstrap-sass
```

You should now have access to bootstrap styles and the components
provided by [bootstrap_for_ember](https://github.com/ember-addons/bootstrap-for-ember). Enjoy!

#Usage

Import Bootstrap styles in `app/styles/app.scss`

```javascript
@import "bootstrap";
```

By default all of Bootstrap is imported.

You can also include optional bootstrap theme:

```javascript
  @import "bootstrap/theme";
```

The full list of bootstrap variables can be found [here](http://getbootstrap.com/customize/#less-variables). You can override these by simply redefining the variable before the `@import` directive, e.g.:

```javascript
$navbar-default-bg: #312312;
$light-orange: #ff8c00;
$navbar-default-color: $light-orange;

@import "bootstrap";
```

You can also import components explicitly. To start with a full list of modules copy [bootstrap.scss](https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/_bootstrap.scss) file into your `app/styles` folder as `_bootstrap-custom.scss`. Then comment out components you do not want from bootstrap-custom. In the application Sass file, replace `@import 'bootstrap'` with:

```javascript
@import 'bootstrap-custom';
```



##Importing bootstrap_for_ember components
By default, all of the bootstrap_for_ember components will be imported
into the project.  You can optionally specify exactly which components
should be imported into the project via the `components` option, which
accepts an array of component names:


```javascript
//your-bootstrap-app/Brocfile.js

/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  'ember-cli-bootstrap-sass': {
    'components': ['bs-alert', 'bs-notifications', 'bs-nav']
  }
});

module.exports = app.toTree();
```
If you set `components` option to `true`, all of the bootstrap_for_ember components will be imported
into the project (this is default settings).

You can `fully exclude bootstrap_for_ember` from the project by setting `components` option to `false` or `[]`:

```javascript
//your-bootstrap-app/Brocfile.js

/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  'ember-cli-bootstrap-sass': {
    'components': false
  }
});

module.exports = app.toTree();
```

## Importing javascript from Twitter Bootstrap
The goal of this addon is to utilize the bootstrap_for_ember library to
be able to implement Twitter Bootstrap's styles and components in a more
'Embery' way. As such, the addon *does not* include the javascript from
Twitter Bootstrap by default.

In situations where you need functionality that is not provided by
bootstrap_for_ember, you can optionally import the Twitter Bootstrap
javascript into your ember-cli project by setting the
`importBootstrapJS` option to true in your `Brocfile.js`:

```javascript
//your-bootstrap-app/Brocfile.js

/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  'ember-cli-bootstrap-sass': {
    'importBootstrapJS': true
  }
});

module.exports = app.toTree();
```
This will import [bootstrap.js](https://github.com/twbs/bootstrap-sass/blob/master/assets/javascripts/bootstrap.js) that contains all of `Bootstrap JavaScript` plugins into the project, concatenated in the [correct order](https://github.com/twbs/bootstrap-sass/blob/master/assets/javascripts/bootstrap-sprockets.js).

You can optionally specify exactly which individual `Bootstrap JavaScript` plugins should be imported into the project via the `importBootstrapJS` option, which accepts an array of plugin names:

```javascript
//your-bootstrap-app/Brocfile.js

/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  'ember-cli-bootstrap-sass': {
    'importBootstrapJS': ['affix','collapse']
  }
});

module.exports = app.toTree();
```

You can check dependencies in the [Bootstrap JS documentation](http://getbootstrap.com/javascript/#transitions).
