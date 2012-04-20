
var fs = require('fs');
var _ = require('underscore');
var logger = {
  info: console.log
};

var sandJS = fs.readFileSync('./js/sand.js', 'utf-8');
logger.info("got script: " + sandJS);
var headScripts = "<script>\n" + sandJS + "\n</script>\n"; 
var html = fs.readFileSync('./templates/colorTuner.html', 'utf-8');

var pageHtml = _.template(html, { headScripts: headScripts });

var pageName = './www/colorTuner.html';
fs.writeFileSync(pageName, pageHtml, 'utf-8');
logger.info("built page: " + pageName);

