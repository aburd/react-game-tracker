const Game = require('../Schema/Game');
const mongoose = require('mongoose');
const mongo = require('mongodb');
const ObjectId = mongo.ObjectId;
const _ = require('underscore');
const bodyParser = require('body-parser')

const router = require('express').Router();

router.route('/games:id?')
  .get(getGames)
  .post(addGame);

function getGames( req, res ) {
  Game.find({})
    .sort({ beaten: -1 })
    .exec(function(err, games) {
      if(err) {
        res.send(err);
      }
      else {
        res.json(games);
        console.log(games.length.toString() + ' game records delivered to client.')
      }

    });
}

function addGame( req, res ) {
  let game = new Game(_.extend({}, req.body));
  game.save(function(err, game) {
    if(err)
      res.send(err);
    else
      res.json(game);
  });
}

router.post('/games/delete', function( req, res ) {
  var id = req.body.id;
  Game.remove({ _id: id }, function(err, removed) {
    if(err){
      res.send(err);
    }
    else {
      console.log(id, 'removed.');
      res.json(removed)
    }
  });
})

module.exports = router;
