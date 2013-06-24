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
  },
  removeCondition: function (characterId, conditionId) {
    conditionId = parseInt(conditionId,10);
    var searchJSON = {_id: characterId, "conditions.conditionId": conditionId};
    console.log(searchJSON);
    var updateJSON = {$pull: {"conditions": {"conditionId": conditionId}}};
    console.log(updateJSON);
    var returnValue = Characters.update(searchJSON,updateJSON);
    return returnValue;
  },
  incrementConditions: function (characterId) {
    var searchJSON = {_id: characterId,"conditions.name": {$gt: ""}};
    console.log(searchJSON);
    var updateJSON = {$inc: {"conditions.$.duration": -1}};
    console.log(updateJSON);
    var returnValue = Characters.update(searchJSON,updateJSON,{multi: true});
    Characters.update({_id: characterId},{$pull: {"conditions": {"duration": {$lt: 1}}}},{multi: true});
    
    return returnValue;
  }
});
