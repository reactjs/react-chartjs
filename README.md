react-chartjs-commonjs
============

Fork of [react-chartjs](https://github.com/jhudson8/react-chartjs) to make it easier to import with webpack
or other CommonJS module loader

Example Usage
-------------
```
var ReactChart = require("react-chartjs-commonjs");

var MyComponent = React.createClass({
  render: function() {
    return <ReactChart.Line data={chartData} options={chartOptions} width="600" height="250"/>
  }
});
```

* ```data``` represents the chart data (see [chart.js](http://www.chartjs.org/) for details)
* ```options``` represents the chart options (see [chart.js](http://www.chartjs.org/) for details)
* all other parameters will be passed through to the ```canvas``` element
