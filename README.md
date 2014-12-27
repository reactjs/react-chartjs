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
### Browser
```
    <script src="path/to/chart.js"></script>
    <script src="path/to/react-chartjs.js"></script>
```

### CommonJS
```
    // allow the components to use the React object
    require('react-chartjs/vars').React = React;
```

Example Usage
-------------
```
var LineChart = Chart.React.Line;  // for browser include
var LineChart = require("react-chartjs/line"); // for commonJS

var MyComponent = React.createClass({
  render: function() {
    return <LineChart data={chartData} options={chartOptions} width="600" height="250/>
  }
});
```

* ```data``` represents the chart data (see [chart.js](http://www.chartjs.org/) for details)
* ```options``` represents the chart options (see [chart.js](http://www.chartjs.org/) for details)
* all other parameters will be passed through to the ```canvas``` element
