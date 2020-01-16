// Since 04/18/2018 - This file is for reference only.
// No need to run it, but use "resolve/alias" in webpack config files both dev/prod.config.js
//
// Reference: https://www.artembutusov.com/webpack-semantic-ui/

const fs = require('fs');

// relocate default config
fs.writeFileSync('node_modules/semantic-ui-less/theme.config', "@import '../../app/semantic/theme.config';\n", 'utf8');

// fix well known bug with default distribution
fixFontPath('node_modules/semantic-ui-less/themes/default/globals/site.variables');
fixFontPath('node_modules/semantic-ui-less/themes/flat/globals/site.variables');
fixFontPath('node_modules/semantic-ui-less/themes/material/globals/site.variables');

function fixFontPath(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const newContent = content.replace("@fontPath  : '../../themes/", "@fontPath  : '../../../themes/");
  fs.writeFileSync(filename, newContent, 'utf8');
}
