Characters = new Meteor.Collection("characters");

var charactersHandle = Meteor.subscribe('characters', function () {
  var characters = Characters.findOne({}, { sort: { initiative: 1 }});
});
