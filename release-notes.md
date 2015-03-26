# Release Notes

## v0.6.0 - March 25th, 2015
- [#12](https://github.com/jhudson8/react-chartjs/pull/12) - Allow custom chart types. ([@tcard](https://api.github.com/users/tcard))
- [#11](https://github.com/jhudson8/react-chartjs/pull/11) - fix failed to update points for doughnut chart ([@neoalienson](https://api.github.com/users/neoal
ienson))

a ```createChart``` method is exposed

description from associated PR

This changeset exposes the createClass method in lib/core, and adds a third argument to it so that you can pass the dataKey value that was previously fixed in the dataKeys variable.

E. g. if you want to use https://github.com/Regaddi/Chart.StackedBar.js, you would do something like var StackedBarChart = require('react-chartjs').createClass('StackedBar', ['getBarsAtEvent'], 'bars'); (provided you previously registered StackedBar with Chart.js, of course).


## v0.5.0 - February 23rd, 2015
- Added a ```getChart``` method on the chart components to return the chartjs object
- Added a ```getCanvass``` method on the chart components to return the canvass DOM element

## v0.4.0 - February 7th, 2015
- Added Chart.js as a peer dependency (thanks @pghalliday)

## v0.3.0 - February 6th, 2015
- Remove AMD and javascript include support to make commonjs behavior simple (thanks @seanadkinson)

## v0.2.1 - January 26th, 2015
- AMD bug fix


## v0.2.0 - January 26th, 2015
- Allow for commonJS code to not require initialization


## v0.1.3 - January 19th, 2015
- Actually include the commit mentioned with the 1.2 release


## v0.1.2 - January 13th, 2015
- fix chart rendering error when properties change


## v0.1.1 - December 28th, 2014
- fix AMD loader - 8c6b8ea


## v0.1.0 - December 28th, 2014
- add AMD loader - c04a10a

