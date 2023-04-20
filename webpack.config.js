// Generated using webpack-cli https://github.com/webpack/webpack-cli
const webpack = require('webpack'); 
const path = require('path');
const Dotenv = require('dotenv-webpack');
const isProduction = process.env.NODE_ENV == "production";
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const stylesHandler = 'style-loader';
//let env_path = isProduction?`./.env`:`./.env.development`;
//const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  // devServer: {
  //   open: true,
  //   host: "localhost",
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),

    new Dotenv(),

  //   new Dotenv({
  //     path:env_path
  // }),

     //new MiniCssExtractPlugin(),

     new webpack.ProvidePlugin({ 
    	process: 'process/browser', 
      Buffer: ['buffer', 'Buffer'] 
    }),

    
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  resolve:{
    extensions: ['.ts', '.js'],
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",

      },
       
      
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
    
  },
};

module.exports = () => {
  plugins: [
    require('tailwindcss'),
  ]

  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
 
// const webpack = require('webpack'); 
// module.exports = function override(config) { 
// 		const fallback = config.resolve.fallback || {}; 
// 		Object.assign(fallback, { 
//     	"crypto": require.resolve("crypto-browserify"), 
//       "stream": require.resolve("stream-browserify"), 
//       "assert": require.resolve("assert"), 
//       "http": require.resolve("stream-http"), 
//       "https": require.resolve("https-browserify"), 
//       "os": require.resolve("os-browserify"), 
//       "url": require.resolve("url") 
//       }) 
//    config.resolve.fallback = fallback; 
//    config.plugins = (config.plugins || []).concat([ 
//    	new webpack.ProvidePlugin({ 
//     	process: 'process/browser', 
//       Buffer: ['buffer', 'Buffer'] 
//     }) 
//    ]) 
//    return config; }
