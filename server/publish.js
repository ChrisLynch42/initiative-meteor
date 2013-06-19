Characters = new Meteor.Collection("characters");

Meteor.publish('characters', function () {
  return Characters.find();
});


Meteor.methods({
  clearActed: function () {
    return Characters.update({},{$set: {acted: 0}},{multi: true});    
  }
});

