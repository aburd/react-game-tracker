// EXPRESS
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var assert = require('assert');
var port = process.env.PORT || 3000;

// WEBPACK
var config = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

// MONGOOSE
const mongoose = require('mongoose');
const gameSchema = require('../db/Schema/Game');
const dbPath = 'mongodb://localhost:27017/games';
const url = 'mongodb://localhost:27017/games';

// CONTROLLERS
const gameController = require('../db/controllers/game-controller')

var app = express();

// Add react-hmre middleware
var compiler = webpack(config);
app.use(
  webpackDevMiddleware(
    compiler,
    { noInfo: true, publicPath: config.output.publicPath}
  )
);
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));
app.get('/', function (req, res) {
    res.sendFile(path.resolve('client/index.html'));
});
// parse any incoming requests with bodyparser
app.use(bodyParser.json());
app.use('/api', gameController);

// Listen, you fool!
app.listen(port, function(error) {
  if (error) throw error;
  console.log("Yo! Express server listening on port", port);
});

// Connect to mongodb
mongoose.connect(url);
