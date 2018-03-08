var webpack = require("webpack");
var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "builds/");
var APP_DIR = path.resolve(__dirname, "react_components/");

var config = {
  entry: APP_DIR + "/index.jsx",
  output: {
    path: BUILD_DIR,
    filename: "react.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  }
};

module.exports = config;
