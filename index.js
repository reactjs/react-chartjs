(function(main) {
    if (typeof Chart === 'function') {
        // script include
        main(Chart);
    } else  {
        // AMD
        define([], function() {
            return main;
        });
    }
})(function(Chart, React) {
  require('./vars').React = React;
  Chart.React = {
    Bar: require('./bar'),
    Doughnut: require('./doughnut'),
    Line: require('./line'),
    Pie: require('./pie'),
    PolarArea: require('./polar-area'),
    Radar: require('./radar')
  };
  return Chart;
});

