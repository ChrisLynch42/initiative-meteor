

Template.controls.events({
  'click #startSession' : function() {
      $("#newSection").css("display", "none");
      $("#startSession").attr("disabled",true);
      $("#startSession").css("display",'none');
      $("#resetSession").css("display",'none');
      $("#endSession").attr("disabled",false);
      $("#endSession").css("display",'inline');
      $("#prevInitiative").attr("disabled",false);
      $("#prevInitiative").css("display",'inline');
      $("#nextInitiative").attr("disabled",false);
      $("#nextInitiative").css("display",'inline');
    },                

    'click #endSession':  function() {
      $("#newSection").css("display", "block");
      $("#startSession").attr("disabled",false);
      $("#startSession").css("display",'inline');
      $("#endSession").attr("disabled",true);
      $("#endSession").css("display",'none');
      $("#prevInitiative").attr("disabled",true);
      $("#prevInitiative").css("display",'none');
      $("#nextInitiative").attr("disabled",true);
      $("#nextInitiative").css("display",'none');
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
      if(secondCharacter.acted > 0) {
        Meteor.apply('clearActed');
      } else {
        Characters.update({_id: firstCharacter._id},{$set: {acted: 1}});
      }
    }    


});
