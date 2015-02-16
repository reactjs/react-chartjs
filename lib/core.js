module.exports = {
  createClass: function(chartType, methodNames) {
    var classData = {
      displayName: chartType + 'Chart',
      getInitialState: function() { return {}; },
      render: function() {
        var _props = {};
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
        this.state.chart[name].apply(this.state.chart, arguments);
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
      if (this.props.redraw) {
        chart.destroy();
        this.initializeChart(nextProps);
      } else {
        updatePoints(nextProps, chart);
        chart.update();
      }
    };

    classData.initializeChart = function(nextProps) {
      var Chart = require('chart.js');
      var el = this.getDOMNode();
      var ctx = el.getContext("2d");
      var chart = new Chart(ctx)[chartType](nextProps.data, nextProps.options || {});
      this.state.chart = chart;
    };

    var i;
    for (i=0; i<extras.length; i++) {
      extra(extras[i]);
    }
    for (i=0; i<methodNames.length; i++) {
      extra(methodNames[i]);
    }

    var React = require('react');
    return React.createClass(classData);
  }
};

var dataKeys = {
  'Line': 'points',
  'Radar': 'points',
  'Bar': 'bars'
};

var updatePoints = function(nextProps, chart) {
  var name = chart.name;

  if (name === 'PolarArea' || name === 'Pie') {
    nextProps.data.forEach(function(segment, segmentIndex) {
      chart.segments[segmentIndex].value = segment.value;
    });
  } else {
    var dataKey = dataKeys[name];
    nextProps.data.datasets.forEach(function(set, setIndex) {
      set.data.forEach(function(val, pointIndex) {
        chart.datasets[setIndex][dataKey][pointIndex].value = val;
      });
    });
  }
};




