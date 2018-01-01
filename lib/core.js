var React = require('react');
var ReactDOM = require('react-dom');

module.exports = {
    createClass: function(chartType, methodNames, dataKey) {
        var excludedProps = ['data', 'options', 'redraw'];

        class ChartComponent extends React.Component {
            constructor(props) {
                super(props);
                this.displayName = chartType + 'Chart';
                this.chart = {};
                this.canvas = null;
            }

            componentDidMount() {
                this.initializeChart();

                this.canvas = ReactDOM.findDOMNode(this);

                var extras = ['clear', 'stop', 'resize', 'toBase64Image', 'generateLegend', 'update', 'addData', 'removeData'],
                    i;
                for (i=0; i<extras.length; i++) {
                    this.extra(extras[i]);
                }
                for (i=0; i<methodNames.length; i++) {
                    this.extra(methodNames[i]);
                }
            };

            componentWillUnmount() {
                var chart = this.chart;
                if (chart) {
                    chart.destroy();
                }
            };

            componentWillReceiveProps(nextProps) {
                var chart = this.chart;
                if (nextProps.redraw) {
                    chart.destroy();
                    this.initializeChart(nextProps);
                } else {
                    dataKey = dataKey || dataKeys[chart.name];
                    updatePoints(nextProps, chart, dataKey);
                    if (chart.scale) {
                        chart.scale.xLabels = nextProps.data.labels;

                        if (chart.scale.calculateXLabelRotation){
                            chart.scale.calculateXLabelRotation();
                        }
                    }
                    chart.update();
                }
            };

            initializeChart() {
                var Chart = require('chart.js');
                var el = ReactDOM.findDOMNode(this);
                var ctx = el.getContext("2d");
                var chart = new Chart(ctx)[chartType](this.props.data, this.props.options || {});
                this.chart = chart;
            };

            extra(type) {
                this[type] = function() {
                    return this.chart[type].apply(this.chart, arguments);
                };
            };

            // return the chartjs instance
            getChart() {
                return this.chart;
            }

            // return the canvass element that contains the chart
            getCanvass() {
                return this.canvas;
            };

            getCanvas() { return this.getCanvass() };

            render() {
                var _props = {};
                for (var name in this.props) {
                    if (this.props.hasOwnProperty(name)) {
                        if (excludedProps.indexOf(name) === -1) {
                            _props[name] = this.props[name];
                        }
                    }
                }

                return React.createElement('canvas', _props)
            }
        }

        return ChartComponent;
    }
};

var dataKeys = {
  'Line': 'points',
  'Radar': 'points',
  'Bar': 'bars'
};

var updatePoints = function(nextProps, chart, dataKey) {
  var name = chart.name;

  if (name === 'PolarArea' || name === 'Pie' || name === 'Doughnut') {
    nextProps.data.forEach(function(segment, segmentIndex) {
      if (!chart.segments[segmentIndex]) {
        chart.addData(segment);
      } else {
        Object.keys(segment).forEach(function (key) {
          chart.segments[segmentIndex][key] = segment[key];
        });
      }
    });

    while(nextProps.data.length < chart.segments.length) {
      chart.removeData();
    }
  } else if (name === "Radar") {
      chart.removeData();
      nextProps.data.datasets.forEach(function(set, setIndex) {
      set.data.forEach(function(val, pointIndex) {
        if (typeof(chart.datasets[setIndex][dataKey][pointIndex]) == "undefined") {
          addData(nextProps, chart, setIndex, pointIndex);
        } else {
          chart.datasets[setIndex][dataKey][pointIndex].value = val;
        }
      });
    });
  } else {
    while (chart.scale.xLabels.length > nextProps.data.labels.length) {
      chart.removeData();
    }
    nextProps.data.datasets.forEach(function(set, setIndex) {
      set.data.forEach(function(val, pointIndex) {
        if (typeof(chart.datasets[setIndex][dataKey][pointIndex]) == "undefined") {
          addData(nextProps, chart, setIndex, pointIndex);
        } else {
          chart.datasets[setIndex][dataKey][pointIndex].value = val;
        }
      });
    });
  }
};

var addData = function(nextProps, chart, setIndex, pointIndex) {
  var values = [];
  nextProps.data.datasets.forEach(function(set) {
    values.push(set.data[pointIndex]);
  });
  chart.addData(values, nextProps.data.labels[setIndex]);
};
