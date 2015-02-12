react-chartjs
============

rich interactive react charting components using [chart.js](http://www.chartjs.org/) including

* Line chart
* Bar chart
* Radar chart
* Polar area chart
* Pie chart
* Doughnut chart

[view chart examples](http://jhudson8.github.io/react-chartjs/index.html)

Installation
------------
This is a CommonJS component only (to be used with something like Webpack or Browserify)
```
npm install --save react-chartjs
```
You must also include [chart.js](https://www.npmjs.com/package/chart.js) and [React](https://www.npmjs.com/package/react) as dependencies.

Example Usage
-------------
```
var LineChart = require("react-chartjs").Line;

var MyComponent = React.createClass({
  render: function() {
    return <LineChart data={chartData} options={chartOptions} width="600" height="250"/>
  }
});
```

* ```data``` represents the chart data (see [chart.js](http://www.chartjs.org/) for details)
* ```options``` represents the chart options (see [chart.js](http://www.chartjs.org/) for details)
* all other parameters will be passed through to the ```canvas``` element


### Other React projects that may interest you

* [jhudson8/react-mixin-manager](https://github.com/jhudson8/react-mixin-manager)
* [jhudson8/react-backbone](https://github.com/jhudson8/react-backbone)
* [jhudson8/react-events](https://github.com/jhudson8/react-events)
* [jhudson8/react-semantic-ui](https://github.com/jhudson8/react-semantic-ui)
* [jhudson8/react-css-builder](https://github.com/jhudson8/react-css-builder)
* [jhudson8/gulp-mocha-tdd](https://github.com/jhudson8/gulp-mocha-tdd) (React friendly)
