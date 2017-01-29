var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = Schema({
  name: {
    required: true,
    type: String
  },
  genre: {
    required: true,
    type: [ String ],
    default: ['not given']
  },
  played: {
    type: Boolean,
    default: false
  },
  beaten: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

gameSchema.statics.findPlayed = function(cb) {
  return this.model('Game').find({played: true}, cb);
}

gameSchema.statics.findBeaten = function(beaten, cb) {
  return this.model('Game').find({beaten: beaten}, cb);
}

gameSchema.statics.byName = function(name) {
  return this.find({ name: new RegExp(name, 'i')})
}

module.exports = mongoose.model('Game', gameSchema);
