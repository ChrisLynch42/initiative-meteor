Characters = new Meteor.Collection("characters");

Meteor.publish('characters', function () {
  return Characters.find();
});


Meteor.methods({
  clearActed: function () {
    return Characters.update({},{$set: {acted: 0}},{multi: true});    
  }
});

Meteor.methods({
  updateCondition: function (characterId, conditionId, nameValue, durationValue, effectValue) {
    conditionId = parseInt(conditionId,10);
    durationValue = parseFloat(durationValue,10);
    var searchJSON = {_id: characterId, "conditions.conditionId": conditionId};
    console.log(searchJSON);
    var updateJSON = {$set: { "conditions.$.name": nameValue, "conditions.$.duration": durationValue, "conditions.$.effect": effectValue }};
    console.log(updateJSON);
    var returnValue = Characters.update(searchJSON,updateJSON);
    return returnValue;
  }
});

Meteor.methods({
  removeCondition: function (characterId, conditionId) {
    conditionId = parseInt(conditionId,10);
    var searchJSON = {_id: characterId, "conditions.conditionId": conditionId};
    console.log(searchJSON);
    var updateJSON = {$pull: {"conditions": {"conditionId": conditionId}}};
    console.log(updateJSON);
    var returnValue = Characters.update(searchJSON,updateJSON);
    return returnValue;
  }
});
