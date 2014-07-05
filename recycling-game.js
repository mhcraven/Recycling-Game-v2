// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Players = new Meteor.Collection("players");

if (Meteor.isClient) {
  //FIX THIS if remove word leaderboard game will work, but...
  Template.changesthistoleaderboard.players = function () {
    return Players.find({}, {sort: {score: -1, name: 1}});
  };

  Template.screens.events = ({
    'click input.add': function () {
      
      Players.insert({name: playerName.value, score: Number(playerScore.value)});
    }
  });

  
}



// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var names = ["Tim the Beaver",
                   "Phil Groundhog"];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i], score: Math.floor(Random.fraction()*10)*5});
    }
  });
}