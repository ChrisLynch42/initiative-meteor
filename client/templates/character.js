
Template.character.idValid = function() {
  var returnValue = false;
  if(typeof this._id != 'undefined') {
    returnValue = true;
  }
  return returnValue;
};


Template.character.events = {
  'click #addCharacter': function() {
     var initiativeValue = $('#newInitiative .initiative').val();
     var nameValue = $('#newInitiative .name').val();
     var hitPointsValue = $('#newInitiative .hitPoints').val();
     Characters.insert({ initiative: initiativeValue , name: nameValue, hitPoints: hitPointsValue, acted: 0 });
  },

  'click .viewClick': function(event) {
     alert(event);
     this.find('.character').addClass('editing');
     this.find('.initiative').focus();
  }
};

