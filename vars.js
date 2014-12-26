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

    if (global.Chart) {
      classData.componentDidMount = function() {
        this.initializeChart(this.props);
      };

      classData.componentWillUnmount = function() {
        var chart = this.state.chart;
        chart.destroy();
      };

      classData.componentWillReceiveProps = function(props) {
        var chart = this.state.chart;
        chart.destroy();
        this.initializeChart(props);
      };

      classData.initializeChart = function(props) {
        var el = this.getDOMNode();
        var ctx = el.getContext("2d");
        var chart = new Chart(ctx)[chartType](this.props.data, this.props.options || {});
        this.state.chart = chart;
      };

      var i;
      for (i=0; i<extras.length; i++) {
        extra(extras[i]);
      }
      for (i=0; i<methodNames.length; i++) {
        extra(methodNames[i]);
      }
    }

    var React = this.React || global.React;
    if (!React) {
      throw new Error("The charts were not initialized with the React instance");
    }

    return React.createClass(classData);
  }
};
