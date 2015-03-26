(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Chartjs"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["Chartjs", "react"], factory);
	else if(typeof exports === 'object')
		exports["react-chartjs"] = factory(require("Chartjs"), require("react"));
	else
		root["react-chartjs"] = factory(root["Chartjs"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  Bar: __webpack_require__(1),
	  Doughnut: __webpack_require__(2),
	  Line: __webpack_require__(3),
	  Pie: __webpack_require__(4),
	  PolarArea: __webpack_require__(5),
	  Radar: __webpack_require__(6),
	  createClass: __webpack_require__(7).createClass
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(7);

	module.exports = vars.createClass('Bar', ['getBarsAtEvent']);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(7);

	module.exports = vars.createClass('Doughnut', ['getSegmentsAtEvent']);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(7);

	module.exports = vars.createClass('Line', ['getPointsAtEvent']);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(7);

	module.exports = vars.createClass('Pie', ['getSegmentsAtEvent']);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(7);

	module.exports = vars.createClass('PolarArea', ['getSegmentsAtEvent']);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var vars = __webpack_require__(7);

	module.exports = vars.createClass('Radar', ['getPointsAtEvent']);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

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
	        dataKey = dataKey || dataKeys[chart.name];
	        updatePoints(nextProps, chart, dataKey);
	        chart.update();
	      }
	    };

	    classData.initializeChart = function(nextProps) {
	      var Chart = __webpack_require__(8);
	      var el = this.getDOMNode();
	      var ctx = el.getContext("2d");
	      var chart = new Chart(ctx)[chartType](nextProps.data, nextProps.options || {});
	      this.state.chart = chart;
	    };

	    // return the chartjs instance
	    classData.getChart = function() {
	      return this.state.chart;
	    };

	    // return the canvass element that contains the chart
	    classData.getCanvass = function() {
	      return this.refs.canvass.getDOMNode();
	    };

	    var i;
	    for (i=0; i<extras.length; i++) {
	      extra(extras[i]);
	    }
	    for (i=0; i<methodNames.length; i++) {
	      extra(methodNames[i]);
	    }

	    var React = __webpack_require__(9);
	    return React.createClass(classData);
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
	      chart.segments[segmentIndex].value = segment.value;
	    });
	  } else {
	    nextProps.data.datasets.forEach(function(set, setIndex) {
	      set.data.forEach(function(val, pointIndex) {
	        chart.datasets[setIndex][dataKey][pointIndex].value = val;
	      });
	    });
	  }
	};






/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }
/******/ ])
});
;