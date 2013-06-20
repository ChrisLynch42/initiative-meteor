
Template.character.idValid = function() {
  var returnValue = false;
  if(typeof this._id != 'undefined') {
    returnValue = true;
  }
  return returnValue;
};

Template.character.displayMode = function(characterObject) {
  characterObject.removeClass('editing');
};

Template.character.emptyCondition = { conditionId: Meteor.Collection.ObjectId(), duration: 0, name: 'empty', effect: 'none'};


Template.character.events = {
  'click #addCharacter': function() {
     var initiativeValue = $('#newInitiative .initiative').val();
     var nameValue = $('#newInitiative .name').val();
     var hitPointsValue = $('#newInitiative .hitPoints').val();
     Characters.insert({ initiative: initiativeValue , name: nameValue, hitPoints: hitPointsValue, acted: 0 });
  },

  'click .characterClick ': function(event) {
     var theTarget = $(event.currentTarget);
     var theObject = theTarget.parents('.character');
     theObject.addClass('editing');
     theTarget.find('input').focus();
  },

  'click #updateCharacter': function(event) {
     var theButton = $(event.currentTarget);
     var characterObject = theButton.parents('.character');
     var value = characterObject.find('.name').val().trim();
     var initiativeValue = characterObject.find('.initiative').val().trim();
     var hitPointValue = characterObject.find('.hitPoints').val().trim();
     if ( value ) {
       Characters.update(this._id,{ name: value, initiative: initiativeValue, hitPoints: hitPointValue, acted: 0 });
     }
     this.displayMode(characterObject);
  },

  'click #removeCharacter': function(event) {
     Characters.remove(this._id);
  },

  'click #addCondition': function(event) {
     Characters.update(this._id,{$push: {conditions: Template.character.emptyCondition }});
  },

  'click #returnCharacter': function(event) {
     var theButton = $(event.currentTarget);
     var conditionObject = theButton.parents('.character');
     conditionObject.removeClass('editing');
  }  
  
};

