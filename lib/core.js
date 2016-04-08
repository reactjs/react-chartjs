// Designed to be used with the current v2.0-dev version of Chart.js
// It's not on NPM, but if you'd like to use it you can, install it
// by setting the chart.js version in your package.json to:
// "chart.js": "git://github.com/danmolitor/Chart.js.git#v2.0-dev"

// I'll try to rework this for their 2.0.0 beta as well.

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = {
  createClass: function(chartType, methodNames, dataKey) {
    var classData = {
      displayName: chartType + 'Chart',
      getInitialState: function() { return {}; },
      render: function() {
        var _props = {
          ref: 'canvass'
        };
        for (var name in this.props) {
          if (this.props.hasOwnProperty(name)) {
            if (name !== 'data' && name !== 'options') {
              _props[name] = this.props[name];
            }
          }
        }
        return React.createElement('canvas', _props);
      }
    };

    var extras = ['clear', 'stop', 'resize', 'toBase64Image', 'generateLegend', 'update', 'addData', 'removeData'];
    function extra(type) {
      classData[type] = function() {
        return this.state.chart[type].apply(this.state.chart, arguments);
      };
    }

    classData.componentDidMount = function() {
      this.initializeChart(this.props);
    };


    classData.componentWillUnmount = function() {
      var chart = this.state.chart;
      chart.destroy();
    };

    classData.componentWillReceiveProps = function(nextProps) {
      var chart = this.state.chart;

      // // Reset the array of datasets
      chart.data.datasets.forEach(function(set, setIndex) {
        set.data.forEach(function(val, pointIndex) {
          set.data = [];
        });
      });

      // // Reset the array of labels
      chart.data.labels = [];

      // Adds the datapoints from nextProps
      var propsToCopy = ['hidden'];

      nextProps.data.datasets.forEach(function(set, setIndex) {
        set.data.forEach(function(val, pointIndex) {
          chart.data.datasets[setIndex].data[pointIndex] = nextProps.data.datasets[setIndex].data[pointIndex];
        });

        propsToCopy.forEach(function(prop) {
            if (nextProps.data.datasets[setIndex][prop] !== undefined) {
                chart.data.datasets[setIndex][prop] = nextProps.data.datasets[setIndex][prop];
            }
        });
      });

      // Sets the labels from nextProps
      nextProps.data.labels.forEach(function(val, labelIndex) {
          chart.data.labels[labelIndex] = nextProps.data.labels[labelIndex];
      });

      // Updates Chart with new data
      chart.update();
  };

    classData.initializeChart = function(nextProps) {
      var Chart = require('chart.js');
      var el = ReactDOM.findDOMNode(this);
      var ctx = el.getContext("2d");

      if (chartType === 'PolarArea'){
        var chart = new Chart(ctx, {
          type: 'polarArea',
          data: nextProps.data,
          options: nextProps.options
        });
      } else {
        var chart = new Chart(ctx, {
          type: chartType.toLowerCase(),
          data: nextProps.data,
          options: nextProps.options
        });
      }
      this.state.chart = chart;
    };


    // return the chartjs instance
    classData.getChart = function() {
      return this.state.chart;
    };

    // return the canvass element that contains the chart
    classData.getCanvass = function() {
      return this.refs.canvass;
    };

    classData.getCanvas = classData.getCanvass;

    var i;
    for (i=0; i<extras.length; i++) {
      extra(extras[i]);
    }
    for (i=0; i<methodNames.length; i++) {
      extra(methodNames[i]);
    }

    return React.createClass(classData);
  }
};
