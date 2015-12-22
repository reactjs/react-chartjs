var webpack = require('webpack'),
    plugins = [];

if (process.env.COMPRESS) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    );
}

module.exports = {

    output: {
        library: 'react-chartjs',
        libraryTarget: 'umd'
    },

    externals: [
        {
            "react": {
                root: "React",
                commonjs2: "react",
                commonjs: "react",
                amd: "react"
            },
            "react-dom": {
                root: "ReactDOM",
                commonjs2: "react-dom",
                commonjs: "react-dom",
                amd: "react-dom"
            },
            "chart.js": {
                root: "Chart",
                commonjs2: "Chartjs",
                commonjs: "Chartjs",
                amd: "Chartjs"
            }
        }
    ],

    node: {
        Buffer: false
    },

    plugins: plugins

};
