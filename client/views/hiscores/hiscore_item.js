Template.player.helpers({

});

Template.player.score = function() {
  return Session.get('score') || 2;
}