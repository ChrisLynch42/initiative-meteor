Characters = new Meteor.Collection("characters");

var charactersHandle = Meteor.subscribe('characters', function () {
  var characters = Characters.findOne({}, { sort: { initiative: 1 }});
});

Controls = new Meteor.Collection("controls");

var controlsHandle = Meteor.subscribe('controls');



