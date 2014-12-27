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

var header = '/*!\n' +
  ' * react-charts v' + version + '\n' +
  ' * https://github.com/jhudson8/react-charts\n' +
  ' *\n' +
  ' *\n' +
  ' * Copyright (c) 2014 Joe Hudson<joehud_AT_gmail.com>\n' +
  ' *\n' +
  ' * Permission is hereby granted, free of charge, to any person obtaining a copy\n' +
  ' * of this software and associated documentation files (the "Software"), to deal\n' +
  ' * in the Software without restriction, including without limitation the rights\n' +
  ' * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n' +
  ' * copies of the Software, and to permit persons to whom the Software is\n' +
  ' * furnished to do so, subject to the following conditions:\n' +
  ' *\n' +
  ' * The above copyright notice and this permission notice shall be included in\n' +
  ' * all copies or substantial portions of the Software.\n' +
  ' *\n' +
  ' * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n' +
  ' * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n' +
  ' * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n' +
  ' * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n' +
  ' * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n' +
  ' * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\n' +
  ' * THE SOFTWARE.\n' +
  ' */\n';

content = header + content;
fs.writeFileSync(file, content, {encoding: 'utf8'});

var minimized = UglifyJS.minify(file);
var minimizedHeader = '/*!\n * [' + name + '](' + repo + ') v' + version + ';  MIT license; Joe Hudson<joehud_AT_gmail.com>\n */\n';
fs.writeFileSync(minimizedFile, minimizedHeader + minimized.code, {encoding: 'utf8'});
