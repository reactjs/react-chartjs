const createClass = require('./lib/core').createClass;

module.exports = {
  Doughnut: createClass('doughnut', []),
  Pie: createClass('pie', []),
  Line: createClass('line', []),
  Bar: createClass('bar', []),
  Radar: createClass('radar', []),
  PolarArea: createClass('polarArea', []),
  Bubble: createClass('bubble', []),
  HorizontalBar: createClass('horizontalBar', []),
  createClass: createClass
};
