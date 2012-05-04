
var fs = require('fs');
var _ = require('underscore');
var logger = {
  info: console.log
};

var scripts = fs.readdirSync('./js');
var headScripts = {};
scripts.forEach(function(scriptName) {
  var script = fs.readFileSync('./js/' + scriptName, 'utf-8');
  headScripts[scriptName.split('.')[0]] = "<script>\n" + script + "\n</script>\n";
  logger.info("got script: " + scriptName);
});

var templates = fs.readdirSync('./templates');
templates.forEach(function(template) {
  var html = fs.readFileSync('./templates/' + template, 'utf-8');
  var pageHtml = _.template(html, { headScripts: headScripts });
  var pageName = './www/' + template;
  fs.writeFileSync(pageName, pageHtml, 'utf-8');
  logger.info("built page: " + pageName);
});









