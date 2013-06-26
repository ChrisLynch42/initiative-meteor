Template.controls.controls = function () {
  return Controls.find({});
}

Template.controls.isStarted = function() {
  var returnValue = false;
  if(this.started > 0) {
    returnValue = true;
  }
  return returnValue;
};

Template.controls.newCharacter = function() {
  var returnValue = {};
  return returnValue;
}


Template.controls.events({
  'click #startSession' : function() {
    Meteor.apply("updateControls",[this._id,1]);
      $("#newSection").css("display", "none");
     // $("#startSession").attr("disabled",true);
     // $("#startSession").css("display",'none');
    },                

    'click #endSession':  function() {
      Meteor.apply("updateControls",[this._id,0]);
      $("#newSection").css("display", "block");
    },

    'click #prevInitiative':  function() {
      var charactersCursor = Characters.find({},{limit: 1, sort: {acted: -1, initiative: -1}});
      var charactersArray = charactersCursor.fetch();
      var lastCharacter = charactersArray[0];
      Characters.update({_id: lastCharacter._id},{$set: {acted: 0}});
    },

    'click #nextInitiative':  function() {     
      var chararactersCursor = Characters.find({},{limit: 2, sort: {acted: 1, initiative: 1}});
      var charactersArray = chararactersCursor.fetch();
      var firstCharacter = charactersArray[0];
      var secondCharacter = charactersArray[1];
     // alert(firstCharacter.name + "----" + firstCharacter.acted);
     // alert(secondCharacter.name + "----" + secondCharacter.acted);
      if(firstCharacter.conditions) {

        for(var i=0;i < firstCharacter.conditions.length;i++) {
          if(firstCharacter.conditions[i].duration) {
            Meteor.apply("incrementCondition",[firstCharacter._id,firstCharacter.conditions[i].conditionId,-1]);
          }
        }
      }
      if(secondCharacter.acted > 0) {
        Meteor.apply('clearActed');
      } else {
        Characters.update({_id: firstCharacter._id},{$set: {acted: 1}});
      }
    }    


});
