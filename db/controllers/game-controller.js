const Game = require('../Schema/Game');
const mongoose = require('mongoose');
const _ = require('underscore');

const router = require('express').Router();

router.route('/games:id?').get(getGames).post(addGame).delete(deleteGame);

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
  console.log(req);
  console.log(req.body);
  let game = new Game(_.extend({}, req.body));
  game.save(function(err, game) {
    if(err)
      res.send(err);
    else
      res.json(game);
  });
}

function deleteGame( req, res ) {
  let id = req.params.id;
  Game.remove({ _id: id }, function(err, removed) {
    if(err)
      res.send(err);
    else {
      res.json(removed);
    }
  });
}

router.get('/getBeaten', function(req, res) {
  Game.findBeaten(true, function(err, games) {
    if(err) {
      res.send(err);
    } else {
      res.json(games);
    }
  })
});

router.get('/getNotBeaten', function(req, res) {
  Game.findBeaten(false, function(err, games) {
    if(err) {
      res.send(err);
    } else {
      res.json(games);
    }
  })
});

module.exports = router;
