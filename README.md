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
    <!-- chart.js must be loaded before react-chartjs -->
    <script src="path/to/chart.js"></script>
    <script src="path/to/react-chartjs.js"></script>
```

### CommonJS
```
    // initialize ReactChartjs
    require('react-chartjs/vars').React = React;
```

### AMD
```
    define('path/to/chart.js', 'react-chartjs', function(Chart, ReactChart) {
        // initialize ReactChartjs
        ReactChart(Chart);
        /// now you can refer to React charts as Chart.React.*
    });
```

Example Usage
-------------
```
var LineChart = Chart.React.Line;  // for browser or AMD (using define('path/to/chart.js'))
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

## Support me

If you like this project you may support me by donating something on Gittip, starring this repository or reporting bugs and ideas in the issue section.

[![gittip](http://jhudson8.github.io/react-mixin-manager/gittip-button.jpg)](https://gratipay.com/jhudson8/)
