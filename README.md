react-chartjs
============

rich interactive react charting components using [chart.js](http://www.chartjs.org/) including

* Line chart
* Bar chart
* Radar chart
* Polar area chart
* Pie chart
* Doughnut chart

[view chart examples](http://reactjs.github.io/react-chartjs/index.html)

Installation
------------
This is a CommonJS component only (to be used with something like Webpack or Browserify)
```
npm install --save react-chartjs
```
You must also include [chart.js](https://www.npmjs.com/package/chart.js) and [React](https://www.npmjs.com/package/react) as dependencies.  
```
npm install --save chart.js@^1.1.1 react react-dom
```  

Example Usage
-------------
```javascript
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
* if data passed into the component changes, points will animate between values using chart.js' ```.update()```. If you want the chart destroyed and redrawn on every change, pass in ```redraw``` as a prop. For example ```<LineChart data={this.state.chartData} redraw />```

Chart References
----------------
The ```canvas``` element can be retrieved using ```getCanvas``` and the ```chartjs object``` can be retrieved using ```getChart```.


### Other React projects that may interest you

* [jhudson8/react-mixin-manager](https://github.com/jhudson8/react-mixin-manager)
* [jhudson8/react-backbone](https://github.com/jhudson8/react-backbone)
* [jhudson8/react-events](https://github.com/jhudson8/react-events)

