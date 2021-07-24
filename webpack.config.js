const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackRules = require("./webpackRules");

module.exports = {
  entry: "./static/src/pages/index.ts",
  devtool: "source-map",
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".json",
    ],
    alias: {
      pagesCSS: path.resolve(__dirname, "./static/pages-css"),
    },
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      ...webpackRules,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/index.html",
    }),
  ],
};
