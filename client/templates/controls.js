

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
      var lastCharacter = this.characters.at(this.characters.length - 1);
      lastCharacter.set({acted: 0});
      this.characters.sort();
      this.addAll();
    },

    'click #nextInitiative':  function() {     
      var chararactersCursor = Characters.find({},{limit: 2, sort: {acted: 1, initiative: 1}});
      var charactersArray = chararactersCursor.fetch();
      var firstCharacter = charactersArray[0];
      var secondCharacter = charactersArray[0];
      alert(secondCharacter.acted > 0);
      if(secondCharacter.acted > 0) {
        Meteor.apply('clearActed');
      } else {
        Characters.update({_id: firstCharacter._id},{$set: {acted: 1}});
      }
    }    


});
