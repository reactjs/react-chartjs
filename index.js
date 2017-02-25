const createClass = require('./lib/core').createClass;

module.exports = {
  DoughnutChart: createClass('doughnut', []),
  PieChart: createClass('pie', []),
  LineChart: createClass('line', []),
  BarChart: createClass('bar', []),
  RadarChart: createClass('radar', []),
  PolarAreaChart: createClass('polarArea', []),
  BubbleChart: createClass('bubble', []),
  HorizontalBarChart: createClass('horizontalBar', []),
  createClass: createClass
};
