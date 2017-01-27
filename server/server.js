var express = require('express');
var path = require('path');
var config = require('../webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/games';

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

/*
** GET LIST OF MY GAMES
*/
app.get('/games', function(req, res) {
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db.collection('games').find({}).toArray()
      .then((data) => {
        console.log('Games sent to client.')
        res.json(data)
      })
      .catch((err) => {
        console.log('Error:', err);
      })

    db.close();
  });
})


/*
** POST A NEW GAME
*/
app.post('/add-game', function(req, res) {
  // Get information submitted by user
  //const game = req

  // Connect to server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err)
    console.log('User sending POST to add game.')

    db.collection('games').insertOne(game)
      .then((game) => {
        console.log(`${game.name} successfully inserted into database`)
      })
      .catch((err) => {
        console.log('Error:', err)
      })

    db.close()
  })
})

var port = 3000;

app.listen(port, function(error) {
  if (error) throw error;
  console.log("Yo! Express server listening on port", port);
});
