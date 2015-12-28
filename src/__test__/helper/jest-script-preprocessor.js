'use strict';

var babel = require("babel-core");

function need_to_process(filename) {
  var targets = [
    'node_modules/apsl-react-native-button/Button.js',
    'node_modules/tcomb-form-native/lib/',
    'node_modules/tcomb/',
    'node_modules/tcomb-validation/',
    'node_modules/tcomb-form-native/',
  ];
  for (var i = 0, len = targets.length; i < len; i++) {
    if (filename.indexOf(targets[i]) > -1) {
      return true;
    }
  };
  return false;
}

module.exports = {
  process: function (src, filename) {
    // babel files can be .js, .es, .jsx or .es6
    if ((filename.indexOf("node_modules") === -1 || need_to_process(filename)) && babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename: filename,
        retainLines: true
      }).code;
    } else {
      //console.error(filename + ' : ignored by');
    }

    return src;
  }
};

