var fs = require('fs'),
    UglifyJS = require('uglify-js');

var packageInfo = JSON.parse(fs.readFileSync('./package.json', {encoding: 'utf-8'})),
    name = packageInfo.name,
    version = packageInfo.version,
    file = './' + name + '.js',
    minimizedFile = './' + name + '.min.js',
    repo = 'https://github.com/jhudson8/' + name,
    content = fs.readFileSync(file, {encoding: 'utf8'}),
    versionMatcher = new RegExp(name + ' v[0-9\.]+');

content = content.replace(versionMatcher, name + ' v' + version);
fs.writeFileSync(file, content, {encoding: 'utf8'});

var minimized = UglifyJS.minify(file);
var minimizedHeader = '/*!\n * [' + name + '](' + repo + ') v' + version + ';  MIT license; Joe Hudson<joehud_AT_gmail.com>\n */\n';
fs.writeFileSync(minimizedFile, minimizedHeader + minimized.code, {encoding: 'utf8'});
